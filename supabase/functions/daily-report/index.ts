// Supabase Edge Function: daily-report
//
// Called by the browser app right after a daily tracker is saved.
//   - mode "student"     -> generate an AI summary, store the report, and email Program Heads
//                           (emails ONCE per entry_id; re-saves update data without re-sending)
//   - mode "facilitator" -> update the stored report with facilitator rating/feedback,
//                           WITHOUT sending another email
//
// Secrets to set (Supabase -> Edge Functions -> Secrets):
//   RESEND_API_KEY        Resend API key
//   RESEND_FROM           verified sender, e.g. "Student Tracker <reports@yourdomain.org>"
//                         (for first tests you can use "onboarding@resend.dev")
//   PROGRAM_HEAD_EMAILS   comma-separated recipient list, e.g. "head1@navgurukul.org,head2@navgurukul.org"
//   ANTHROPIC_API_KEY     Anthropic API key (for the AI summary)
//   REPORT_MODEL          optional, defaults to "claude-haiku-4-5"
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by the platform automatically.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function pct(value: unknown): string {
  const n = Number(value);
  return Number.isFinite(n) ? `${Math.round(n)}%` : "—";
}

function textOrPending(value: unknown, complete: boolean): string {
  const s = String(value ?? "").trim();
  if (s) return s;
  return complete ? "—" : "Pending — facilitator hasn't reviewed yet";
}

// ---- AI summary -----------------------------------------------------------

async function generateAiSummary(report: any): Promise<any> {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  const model = Deno.env.get("REPORT_MODEL") || "claude-haiku-4-5";
  const fallback = templatedSummary(report);
  if (!apiKey) return fallback;

  const facts = [
    `Student: ${report.studentName}`,
    `Date: ${report.date}`,
    `Attendance: ${report.attendance}`,
    `Overall score: ${report.overallScore}%`,
    `Category scores: practicals ${report.categoryScores?.practicals}%, english ${report.categoryScores?.english}%, theory ${report.categoryScores?.theory}%, wellness/self-care ${report.categoryScores?.wellness}%`,
    `Self-care: checklist ${report.selfCare?.percent}%, mood ${report.selfCare?.mood}, water ${report.selfCare?.water}, emotional rating ${report.selfCare?.emotionalRating}/10`,
    `English: speaking ${report.english?.speaking}, level ${report.english?.level}, confidence ${report.english?.confidence}/10, new words "${report.english?.newWords || ""}"`,
    `Theory: topic "${report.theory?.topic || ""}", completion ${report.theory?.completion}, understanding ${report.theory?.understanding}/10`,
    `Practical: "${report.practical?.name || ""}", completion ${report.practical?.completion}, confidence ${report.practical?.confidence}/10`,
    `AI tool usage: tools "${report.aiUsage?.tools || ""}", learned "${report.aiUsage?.learned || ""}", confidence ${report.aiUsage?.confidence}/10`,
    `Student self-rating: ${report.studentSelfRating}/10`,
    `Facilitator rating: ${report.facilitatorComplete ? report.facilitatorRating + "/10" : "not yet provided"}`,
  ].join("\n");

  const system =
    "You write concise, supportive daily performance summaries for vocational-training students. " +
    "Be specific and encouraging, never harsh. Respond with ONLY valid minified JSON, no markdown, " +
    'with exactly these keys: {"achievements": string[], "areas_needing_support": string[], "next_steps": string[]}. ' +
    "Each array has 2-3 short, plain-English bullet points.";

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 600,
        system,
        messages: [{ role: "user", content: `Summarise this student's day:\n\n${facts}` }],
      }),
    });
    if (!res.ok) {
      console.error("[daily-report] Anthropic error", res.status, await res.text());
      return fallback;
    }
    const data = await res.json();
    const text = (data?.content?.[0]?.text || "").trim();
    const cleaned = text.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      achievements: arr(parsed.achievements),
      areas_needing_support: arr(parsed.areas_needing_support),
      next_steps: arr(parsed.next_steps),
    };
  } catch (error) {
    console.error("[daily-report] AI summary failed, using templated fallback.", error);
    return fallback;
  }
}

function arr(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean).slice(0, 4);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

// Deterministic summary used when the AI call is unavailable, so an email always sends.
function templatedSummary(report: any): any {
  const cats = report.categoryScores || {};
  const labelled: [string, number][] = [
    ["Practicals", Number(cats.practicals) || 0],
    ["English", Number(cats.english) || 0],
    ["Theory", Number(cats.theory) || 0],
    ["Self-care / wellness", Number(cats.wellness) || 0],
  ];
  const strong = labelled.filter(([, v]) => v >= 70).map(([k]) => k);
  const weak = labelled.filter(([, v]) => v < 50).map(([k]) => k);
  const achievements: string[] = [];
  if (report.attendance === "Present") achievements.push("Attended and logged the day's progress.");
  if (strong.length) achievements.push(`Strong progress in ${strong.join(", ")}.`);
  if (!achievements.length) achievements.push("Completed and submitted the daily tracker.");
  const areas = weak.length
    ? [`Needs more support in ${weak.join(", ")}.`]
    : ["No major gaps flagged today; keep up the consistency."];
  const next = weak.length
    ? [`Set one small goal for ${weak[0]} tomorrow.`, "Facilitator to review and add feedback."]
    : ["Maintain the routine and aim to raise the lowest area."];
  return { achievements, areas_needing_support: areas, next_steps: next };
}

// ---- Email ----------------------------------------------------------------

function buildEmailHtml(report: any, summary: any): string {
  const c = report.categoryScores || {};
  const f = report.facilitatorFeedback || {};
  const list = (items: string[]) =>
    `<ul style="margin:6px 0 0;padding-left:18px;color:#3d3d3a">${(items || [])
      .map((i) => `<li style="margin:2px 0">${escapeHtml(i)}</li>`)
      .join("")}</ul>`;
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 10px;color:#6c6a64;border-bottom:1px solid #efe9de">${label}</td>` +
    `<td style="padding:6px 10px;color:#141413;border-bottom:1px solid #efe9de">${value}</td></tr>`;

  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;background:#faf9f5;padding:24px;color:#141413">
    <h2 style="margin:0 0 4px;font-size:20px">Daily Performance Report</h2>
    <p style="margin:0 0 16px;color:#6c6a64">${escapeHtml(report.studentName || "Student")} · ${escapeHtml(report.date || "")}${report.schoolName ? " · " + escapeHtml(report.schoolName) : ""}</p>

    <div style="background:#cc785c;color:#fff;border-radius:12px;padding:14px 18px;margin-bottom:16px">
      <span style="font-size:13px;opacity:.9">Overall Daily Performance</span>
      <div style="font-size:28px;font-weight:600">${Number(report.overallScore) || 0}%</div>
    </div>

    <table style="width:100%;border-collapse:collapse;font-size:14px;background:#fff;border-radius:12px;overflow:hidden">
      ${row("Attendance", escapeHtml(report.attendance || "—"))}
      ${row("Self-care", `${escapeHtml(report.selfCare?.percent != null ? report.selfCare.percent + "%" : "—")} · mood ${escapeHtml(report.selfCare?.mood || "—")} · water ${escapeHtml(report.selfCare?.water || "—")}`)}
      ${row("English", `${escapeHtml(report.english?.level || "—")} · speaking ${escapeHtml(report.english?.speaking || "—")} · confidence ${report.english?.confidence ?? "—"}/10`)}
      ${row("Theory", `${escapeHtml(report.theory?.topic || "—")} · ${escapeHtml(report.theory?.completion || "—")} done · understanding ${report.theory?.understanding ?? "—"}/10`)}
      ${row("Practical", `${escapeHtml(report.practical?.name || "—")} · ${escapeHtml(report.practical?.completion || "—")} done · confidence ${report.practical?.confidence ?? "—"}/10`)}
      ${row("AI tool usage", escapeHtml(report.aiUsage?.tools || report.aiUsage?.learned || "—"))}
      ${row("Category scores", `Practical ${pct(c.practicals)} · English ${pct(c.english)} · Theory ${pct(c.theory)} · Wellness ${pct(c.wellness)}`)}
      ${row("Student self-rating", `${report.studentSelfRating ?? "—"}/10`)}
      ${row("Facilitator rating", report.facilitatorComplete ? `${report.facilitatorRating ?? "—"}/10` : "Pending — facilitator hasn't reviewed yet")}
      ${row("Facilitator feedback", escapeHtml(textOrPending(f.strengths || f.comments || f.improvements, report.facilitatorComplete)))}
    </table>

    <div style="background:#fff;border-radius:12px;padding:16px;margin-top:16px">
      <h3 style="margin:0 0 8px;font-size:15px;color:#5b8c5a">Key achievements</h3>
      ${list(summary.achievements)}
      <h3 style="margin:14px 0 8px;font-size:15px;color:#c96442">Areas needing support</h3>
      ${list(summary.areas_needing_support)}
      <h3 style="margin:14px 0 8px;font-size:15px;color:#5d8db8">Recommended next steps</h3>
      ${list(summary.next_steps)}
    </div>

    <p style="margin:18px 0 0;font-size:12px;color:#8e8b82">Sent automatically by the Student Progress Tracker. ${report.facilitatorComplete ? "" : "Facilitator review was still pending when this report was generated."}</p>
  </div>`;
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(report: any, summary: any, recipients: string[]): Promise<{ ok: boolean; error?: string }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("RESEND_FROM");
  if (!apiKey || !from) return { ok: false, error: "RESEND_API_KEY or RESEND_FROM not configured" };
  if (!recipients.length) return { ok: false, error: "No PROGRAM_HEAD_EMAILS configured" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: recipients,
        subject: `Daily report — ${report.studentName || "Student"} — ${report.date} (${Number(report.overallScore) || 0}%)`,
        html: buildEmailHtml(report, summary),
      }),
    });
    if (!res.ok) return { ok: false, error: `Resend ${res.status}: ${await res.text()}` };
    return { ok: true };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
}

// ---- Handler --------------------------------------------------------------

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let report: any;
  try {
    report = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }
  if (!report?.entryId) return json({ error: "Missing entryId" }, 400);

  const mode = report.mode === "facilitator" ? "facilitator" : "student";
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Look up any existing report for this entry (to dedupe emails on re-saves).
  const { data: existing } = await supabase
    .from("daily_reports")
    .select("id, email_status, ai_summary")
    .eq("entry_id", report.entryId)
    .maybeSingle();

  const recipients = (Deno.env.get("PROGRAM_HEAD_EMAILS") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const baseRow: Record<string, unknown> = {
    entry_id: report.entryId,
    student_name: report.studentName || "",
    school_name: report.schoolName || null,
    report_date: report.date,
    attendance: report.attendance || null,
    overall_score: Number(report.overallScore) || 0,
    category_scores: report.categoryScores || {},
    metrics: report,
    facilitator_complete: !!report.facilitatorComplete,
    recipients,
  };
  // Only set student_email when we actually have it, so a facilitator update (which doesn't
  // know the student's email) doesn't overwrite the value captured at student submit.
  if (report.studentEmail) baseRow.student_email = report.studentEmail;

  // Facilitator update: refresh stored data, keep existing AI summary, do NOT email.
  if (mode === "facilitator") {
    const row = {
      ...baseRow,
      ai_summary: existing?.ai_summary && Object.keys(existing.ai_summary).length ? existing.ai_summary : templatedSummary(report),
      email_status: existing?.email_status || "skipped",
    };
    const { error } = await supabase.from("daily_reports").upsert(row, { onConflict: "entry_id" });
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true, mode, emailed: false });
  }

  // Student submit: generate AI summary + store. Email only if not already sent.
  const summary = await generateAiSummary(report);
  const alreadySent = existing?.email_status === "sent";
  let emailStatus = existing?.email_status || "pending";
  let emailError: string | null = null;
  let emailed = false;

  if (!alreadySent) {
    const result = await sendEmail(report, summary, recipients);
    emailed = result.ok;
    emailStatus = result.ok ? "sent" : "failed";
    emailError = result.error || null;
    if (!result.ok) console.error("[daily-report] Email send failed:", result.error);
  }

  const { error } = await supabase.from("daily_reports").upsert(
    { ...baseRow, ai_summary: summary, email_status: emailStatus, email_error: emailError },
    { onConflict: "entry_id" },
  );
  if (error) return json({ error: error.message }, 500);

  return json({ ok: true, mode, emailed, email_status: emailStatus });
});
