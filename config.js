window.APP_CONFIG = {
  persistenceMode: "supabase",
  supabaseUrl: "https://almhhzssdirqlmznsmkt.supabase.co",
  supabaseAnonKey: "sb_publishable_rB1-oNZGgEeSYlBPZXopkQ_Vm0qj3NB",
  supabaseTable: "student_progress_entries",

  // Google sign-in is restricted to this email domain. Only these accounts can sign in.
  allowedEmailDomain: "navgurukul.org",

  // Roles are detected automatically from the email address:
  //   - a number before the "@" (a join year) => student, e.g. aanistamalik22@navgurukul.org
  //   - no number                              => facilitator, e.g. aanista@navgurukul.org
  // Use these lists ONLY for rare exceptions that break the rule above.
  // Example: facilitatorEmails: ["ravi2@navgurukul.org"]
  facilitatorEmails: [],
  studentEmails: [],

  // Program Heads who receive the daily report emails.
  // IMPORTANT: the authoritative send-list is the Edge Function secret PROGRAM_HEAD_EMAILS
  // (kept server-side so it can't be tampered with from the browser). This in-app list is
  // optional/for future use (e.g. badging program-head accounts); keep them in sync.
  programHeadEmails: [],
};
