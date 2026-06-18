window.APP_CONFIG = {
  // Use "supabase" after you create the database table in database/schema.sql.
  // Keep "local" while developing without a cloud database.
  persistenceMode: "supabase",
  supabaseUrl: "https://YOUR_PROJECT_REF.supabase.co",
  supabaseAnonKey: "YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY",
  supabaseTable: "student_progress_entries",

  // Google sign-in is restricted to this email domain. Only these accounts can sign in.
  allowedEmailDomain: "navgurukul.org",

  // Roles are detected automatically from the email address:
  //   - a number before the "@" (a join year) => student, e.g. aanistamalik22@navgurukul.org
  //   - no number                              => facilitator, e.g. aanista@navgurukul.org
  // Use these lists ONLY for rare exceptions that break the rule above.
  facilitatorEmails: [],
  studentEmails: [],

  // Program Heads who receive daily report emails. The authoritative send-list is the
  // Edge Function secret PROGRAM_HEAD_EMAILS; this in-app list is optional/for future use.
  programHeadEmails: [],
};
