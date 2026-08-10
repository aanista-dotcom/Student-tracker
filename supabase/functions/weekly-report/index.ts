// Supabase Edge Function: weekly-report
//
// Sends ONE combined weekly digest email to the Program Heads, summarising every
// student's whole week (attendance, average scores, wins, and areas needing support),
// grouped by batch/school. Meant to be called on a schedule (Supabase Cron) once a
// week — by default Saturday 18:00 IST (12:30 UTC). See docs/EMAIL_REPORTS_SETUP.md.
//
// It reads the rows the `daily-report` function already stores in `daily_reports`,
// so no extra data collection is needed.
//
// Secrets (Supabase -> Edge Functions -> Secrets) — same ones the daily function uses:
//   RESEND_API_KEY        Resend API key
//   RESEND_FROM           verified sender, e.g. "Kadam <reports@navgurukul.org>"
//   PROGRAM_HEAD_EMAILS   comma-separated recipient list
//   INCEPTION_API_KEY     Inception (Mercury) key for the AI overview — OPTIONAL
//   REPORT_MODEL          optional, defaults to "mercury-2"
//   CRON_SECRET           optional; if set, the caller must send header "x-cron-secret: <value>"
//   WEEKLY_DAYS           optional, defaults to 7 (how many days back the digest covers)
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by the platform automatically.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function round(n: number): number {
  return Number.isFinite(n) ? Math.round(n) : 0;
}

function mean(nums: number[]): number {
  const valid = nums.filter((n) => Number.isFinite(n));
  if (!valid.length) return 0;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function prettyDate(s: string): string {
  const d = new Date(s + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

// ---- Weekly per-student rollup -------------------------------------------

interface StudentWeek {
  studentName: string;
  schoolName: string;
  daysLogged: number;
  daysPresent: number;
  avgOverall: number;
  cats: { practicals: number; english: number; theory: number; wellness: number };
  facilitatorReviewed: boolean;
  win: string;
  need: string;
}

function insight(cats: StudentWeek["cats"]): { win: string; need: string } {
  const labelled: [string, number][] = [
    ["Practicals", cats.practicals],
    ["English", cats.english],
    ["Theory", cats.theory],
    ["Self-care", cats.wellness],
  ];
  const strong = labelled.filter(([, v]) => v >= 70).map(([k]) => k);
  const weak = labelled.filter(([, v]) => v < 50).map(([k]) => k);
  const win = strong.length ? `Strong in ${strong.join(", ")}.` : "Steady participation through the week.";
  const need = weak.length ? `Needs support in ${weak.join(", ")}.` : "No major gaps flagged this week.";
  return { win, need };
}

function rollUp(rows: any[]): StudentWeek[] {
  const groups = new Map<string, any[]>();
  for (const r of rows) {
    const key = `${(r.student_name || "Unnamed student").trim()}||${(r.school_name || "").trim()}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(r);
  }
  const out: StudentWeek[] = [];
  for (const [key, list] of groups) {
    const [studentName, schoolName] = key.split("||");
    const cats = {
      practicals: round(mean(list.map((r) => Number(r.category_scores?.practicals)))),
      english: round(mean(list.map((r) => Number(r.category_scores?.english)))),
      theory: round(mean(list.map((r) => Number(r.category_scores?.theory)))),
      wellness: round(mean(list.map((r) => Number(r.category_scores?.wellness)))),
    };
    const { win, need } = insight(cats);
    out.push({
      studentName: studentName || "Unnamed student",
      schoolName,
      daysLogged: list.length,
      daysPresent: list.filter((r) => String(r.attendance || "").toLowerCase() === "present").length,
      avgOverall: round(mean(list.map((r) => Number(r.overall_score)))),
      cats,
      facilitatorReviewed: list.some((r) => !!r.facilitator_complete),
      win,
      need,
    });
  }
  return out;
}

// ---- Optional AI overview (one call for the whole digest) -----------------

async function aiOverview(students: StudentWeek[], rangeLabel: string): Promise<string> {
  const apiKey = Deno.env.get("INCEPTION_API_KEY");
  const cohortAvg = round(mean(students.map((s) => s.avgOverall)));
  const fallback =
    `This week (${rangeLabel}) covers ${students.length} student${students.length === 1 ? "" : "s"}, ` +
    `with an average overall score of ${cohortAvg}%. See each student's summary below.`;
  if (!apiKey) return fallback;

  const model = Deno.env.get("REPORT_MODEL") || "mercury-2";
  const lines = students
    .slice(0, 60)
    .map((s) => `${s.studentName} (${s.schoolName || "no batch"}): overall ${s.avgOverall}%, present ${s.daysPresent}/${s.daysLogged}`)
    .join("\n");
  const system =
    "You write a short, warm, 2-3 sentence overview for a weekly progress digest sent to program heads " +
    "of a vocational-training program. Be encouraging and specific about the cohort as a whole. " +
    "Respond with plain text only — no markdown, no lists.";
  try {
    const res = await fetch("https://api.inceptionlabs.ai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        max_tokens: 220,
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Week: ${rangeLabel}\nCohort average: ${cohortAvg}%\n\n${lines}` },
        ],
      }),
    });
    if (!res.ok) {
      console.error("[weekly-report] AI overview error", res.status, await res.text());
      return fallback;
    }
    const data = await res.json();
    const text = String(data?.choices?.[0]?.message?.content || "").trim();
    return text || fallback;
  } catch (error) {
    console.error("[weekly-report] AI overview failed, using fallback.", error);
    return fallback;
  }
}

// ---- Email ----------------------------------------------------------------

function bar(label: string, value: number): string {
  const v = Math.max(0, Math.min(100, round(value)));
  const color = v >= 70 ? "#5b8c5a" : v >= 50 ? "#d9a441" : "#c96442";
  return `
    <div style="margin:3px 0">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#6c6a64">
        <span>${label}</span><span>${v}%</span>
      </div>
      <div style="background:#efe9de;border-radius:6px;height:6px;overflow:hidden">
        <div style="width:${v}%;height:6px;background:${color}"></div>
      </div>
    </div>`;
}

function studentBlock(s: StudentWeek): string {
  return `
  <div style="background:#fff;border-radius:12px;padding:14px 16px;margin:10px 0">
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px">
      <strong style="font-size:15px;color:#141413">${escapeHtml(s.studentName)}</strong>
      <span style="font-size:13px;color:#6c6a64">${s.avgOverall}% avg · present ${s.daysPresent}/${s.daysLogged}</span>
    </div>
    <div style="margin:8px 0">
      ${bar("Practical", s.cats.practicals)}
      ${bar("English", s.cats.english)}
      ${bar("Theory", s.cats.theory)}
      ${bar("Self-care", s.cats.wellness)}
    </div>
    <p style="margin:4px 0 0;font-size:13px;color:#3d3d3a"><span style="color:#5b8c5a">Wins:</span> ${escapeHtml(s.win)}</p>
    <p style="margin:2px 0 0;font-size:13px;color:#3d3d3a"><span style="color:#c96442">Needs support:</span> ${escapeHtml(s.need)}</p>
    ${s.facilitatorReviewed ? "" : `<p style="margin:6px 0 0;font-size:12px;color:#8e8b82">Facilitator review pending for part of the week.</p>`}
  </div>`;
}

function buildDigestHtml(students: StudentWeek[], rangeLabel: string, overview: string): string {
  // Group by batch/school, batches alphabetical, students by score desc within a batch.
  const batches = new Map<string, StudentWeek[]>();
  for (const s of students) {
    const b = s.schoolName || "No batch";
    if (!batches.has(b)) batches.set(b, []);
    batches.get(b)!.push(s);
  }
  const batchNames = [...batches.keys()].sort((a, b) => a.localeCompare(b));
  const sections = batchNames
    .map((b) => {
      const list = batches.get(b)!.sort((x, y) => y.avgOverall - x.avgOverall);
      return `
        <h3 style="margin:22px 0 4px;font-size:16px;color:#141413">${escapeHtml(b)}
          <span style="font-size:13px;font-weight:normal;color:#8e8b82"> · ${list.length} student${list.length === 1 ? "" : "s"}</span>
        </h3>
        ${list.map(studentBlock).join("")}`;
    })
    .join("");

  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:660px;margin:0 auto;background:#faf9f5;padding:24px;color:#141413">
    <h2 style="margin:0 0 4px;font-size:22px">Kadam — Weekly Progress Digest</h2>
    <p style="margin:0 0 16px;color:#6c6a64">${escapeHtml(rangeLabel)} · ${students.length} student${students.length === 1 ? "" : "s"} · ${batchNames.length} batch${batchNames.length === 1 ? "" : "es"}</p>
    <div style="background:#181715;color:#faf9f5;border-radius:12px;padding:16px 18px;margin-bottom:8px">
      <span style="font-size:13px;opacity:.85">This week</span>
      <p style="margin:6px 0 0;font-size:14px;line-height:1.5">${escapeHtml(overview)}</p>
    </div>
    ${sections}
    <p style="margin:22px 0 0;font-size:12px;color:#8e8b82">Sent automatically by Kadam, the daily progress tracker. This digest replaces the per-day emails and covers ${escapeHtml(rangeLabel)}.</p>
  </div>`;
}

async function sendEmail(html: string, subject: string, recipients: string[]): Promise<{ ok: boolean; error?: string }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("RESEND_FROM");
  if (!apiKey || !from) return { ok: false, error: "RESEND_API_KEY or RESEND_FROM not configured" };
  if (!recipients.length) return { ok: false, error: "No PROGRAM_HEAD_EMAILS configured" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: recipients, subject, html }),
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

  // Optional shared-secret guard for the scheduled caller.
  const cronSecret = Deno.env.get("CRON_SECRET");
  if (cronSecret && req.headers.get("x-cron-secret") !== cronSecret) {
    return json({ error: "Unauthorized" }, 401);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const days = Math.max(1, Number(Deno.env.get("WEEKLY_DAYS")) || 7);
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  const startStr = ymd(start);
  const endStr = ymd(end);
  const rangeLabel = `${prettyDate(startStr)} – ${prettyDate(endStr)}`;

  const { data: rows, error } = await supabase
    .from("daily_reports")
    .select("student_name, school_name, report_date, attendance, overall_score, category_scores, facilitator_complete")
    .gte("report_date", startStr)
    .lte("report_date", endStr);

  if (error) return json({ error: error.message }, 500);

  const students = rollUp(rows || []).sort((a, b) => b.avgOverall - a.avgOverall);
  if (!students.length) {
    return json({ ok: true, sent: false, reason: "No student activity in the window.", range: rangeLabel });
  }

  const recipients = (Deno.env.get("PROGRAM_HEAD_EMAILS") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const overview = await aiOverview(students, rangeLabel);
  const html = buildDigestHtml(students, rangeLabel, overview);
  const subject = `Kadam — Weekly Progress Digest — ${rangeLabel} (${students.length} student${students.length === 1 ? "" : "s"})`;

  const result = await sendEmail(html, subject, recipients);
  if (!result.ok) {
    console.error("[weekly-report] Email send failed:", result.error);
    return json({ ok: false, sent: false, error: result.error, students: students.length, range: rangeLabel }, 500);
  }

  return json({ ok: true, sent: true, students: students.length, batches: new Set(students.map((s) => s.schoolName || "No batch")).size, range: rangeLabel });
});
