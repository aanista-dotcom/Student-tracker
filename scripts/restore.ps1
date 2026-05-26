param(
  [Parameter(Mandatory = $true)]
  [string]$BackupFile
)

$ErrorActionPreference = "Stop"
$restoreLog = ".\restore.log"

function Write-RestoreLog {
  param([string]$Message)
  "$(Get-Date -Format o) $Message" | Tee-Object -FilePath $restoreLog -Append
}

try {
  if (-not $env:DATABASE_URL) {
    throw "DATABASE_URL is missing. Point it at the database you want to restore into."
  }
  if (-not $env:BACKUP_GPG_PASSPHRASE) {
    throw "BACKUP_GPG_PASSPHRASE is missing. It must match the passphrase used during backup."
  }
  if (-not (Test-Path -LiteralPath $BackupFile)) {
    throw "Backup file not found: $BackupFile"
  }

  $gpg = Get-Command gpg -ErrorAction SilentlyContinue
  $psql = Get-Command psql -ErrorAction SilentlyContinue
  if (-not $gpg) { throw "gpg was not found." }
  if (-not $psql) { throw "psql was not found. Install PostgreSQL client tools." }

  $plainDump = $BackupFile -replace "\.gpg$", ""
  if ($plainDump -eq $BackupFile) { $plainDump = "$BackupFile.sql" }

  Write-RestoreLog "Decrypting backup $BackupFile"
  & $gpg.Source --batch --yes --decrypt --passphrase $env:BACKUP_GPG_PASSPHRASE --output $plainDump $BackupFile
  if ($LASTEXITCODE -ne 0) { throw "gpg decrypt failed with exit code $LASTEXITCODE" }

  Write-RestoreLog "Restoring dump into target database"
  & $psql.Source $env:DATABASE_URL -f $plainDump
  if ($LASTEXITCODE -ne 0) { throw "psql restore failed with exit code $LASTEXITCODE" }

  Remove-Item -LiteralPath $plainDump -Force
  Write-RestoreLog "Restore completed successfully."
}
catch {
  Write-RestoreLog "RESTORE FAILED: $($_.Exception.Message)"
  exit 1
}
