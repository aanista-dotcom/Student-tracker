param(
  [ValidateSet("daily", "weekly", "manual")]
  [string]$Kind = "manual",
  [string]$OutputDir = ".\backups"
)

$ErrorActionPreference = "Stop"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupName = "student-tracker-$Kind-$timestamp"
$logFile = Join-Path $OutputDir "$backupName.log"

New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

function Write-BackupLog {
  param([string]$Message)
  $line = "$(Get-Date -Format o) $Message"
  $line | Tee-Object -FilePath $logFile -Append
}

try {
  if (-not $env:DATABASE_URL) {
    throw "DATABASE_URL is missing. Set it in your environment before running backup."
  }
  if (-not $env:BACKUP_GPG_PASSPHRASE) {
    throw "BACKUP_GPG_PASSPHRASE is missing. Set a strong passphrase before running backup."
  }

  $pgDump = Get-Command pg_dump -ErrorAction SilentlyContinue
  if (-not $pgDump) {
    throw "pg_dump was not found. Install PostgreSQL client tools or run backups through GitHub Actions."
  }

  $plainDump = Join-Path $OutputDir "$backupName.sql"
  $encryptedDump = "$plainDump.gpg"

  Write-BackupLog "Starting $Kind backup: $backupName"
  & $pgDump.Source --dbname $env:DATABASE_URL --format plain --clean --if-exists --no-owner --file $plainDump
  if ($LASTEXITCODE -ne 0) { throw "pg_dump failed with exit code $LASTEXITCODE" }

  $gpg = Get-Command gpg -ErrorAction SilentlyContinue
  if (-not $gpg) {
    throw "gpg was not found. Install GnuPG or use GitHub Actions backup workflow."
  }

  & $gpg.Source --batch --yes --symmetric --cipher-algo AES256 --passphrase $env:BACKUP_GPG_PASSPHRASE --output $encryptedDump $plainDump
  if ($LASTEXITCODE -ne 0) { throw "gpg encryption failed with exit code $LASTEXITCODE" }

  Remove-Item -LiteralPath $plainDump -Force
  Write-BackupLog "Backup encrypted successfully: $encryptedDump"
  Write-BackupLog "Store this file off-site, for example in S3/R2/Drive with restricted access."
}
catch {
  Write-BackupLog "BACKUP FAILED: $($_.Exception.Message)"
  exit 1
}
