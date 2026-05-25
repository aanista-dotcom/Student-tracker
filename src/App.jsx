const { useEffect, useMemo, useState } = React;

function IconGlyph({ label, className = "", size = 22 }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid place-items-center rounded-full font-black ${className}`}
      style={{ width: size, height: size, fontSize: Math.max(12, size * 0.58) }}
    >
      {label}
    </span>
  );
}

const Award = (props) => <IconGlyph label="A" {...props} />;
const BarChart3 = (props) => <IconGlyph label="%" {...props} />;
const CalendarDays = (props) => <IconGlyph label="D" {...props} />;
const Check = (props) => <IconGlyph label="✓" {...props} />;
const Download = (props) => <IconGlyph label="↓" {...props} />;
const HeartHandshake = (props) => <IconGlyph label="H" {...props} />;
const Moon = (props) => <IconGlyph label="☾" {...props} />;
const Save = (props) => <IconGlyph label="S" {...props} />;
const Search = (props) => <IconGlyph label="⌕" {...props} />;
const Sparkles = (props) => <IconGlyph label="*" {...props} />;
const Sun = (props) => <IconGlyph label="☼" {...props} />;
const UserRound = (props) => <IconGlyph label="U" {...props} />;

const STORAGE_KEY = "student-progress-tracker:v5";
const ROLE_KEY = "student-progress-tracker:role:v2";
const AUTH_KEY = "student-progress-tracker:auth:v1";

const moods = ["Happy", "Calm", "Sad", "Angry", "Tired", "Motivated", "Anxious", "Excited"];
const attendance = ["Present", "Absent"];
const waterOptions = ["500 ml", "1 L", "1.5 L", "2 L", "2.5 L", "3 L+"];
const englishPercentages = ["0-20%", "20-40%", "40-60%", "60-80%", "80-100%"];
const englishLevels = ["Beginner", "Basic", "Intermediate", "Advanced"];
const completionOptions = ["0%", "25%", "50%", "75%", "100%"];
const statusOptions = ["Excellent", "Good", "Average", "Needs Support"];

const selfCareChecks = {
  "Hygiene & Personal Care": [
    "Brushed teeth",
    "Took bath",
    "Combed hair",
    "Wore clean clothes",
    "Washed hands regularly",
    "Trimmed nails (weekly)",
    "Slept properly",
    "Kept surroundings clean",
    "Used deodorant/maintained hygiene",
  ],
  "Food & Nutrition": [
    "Ate breakfast",
    "Ate lunch",
    "Ate dinner",
    "Ate fruits",
    "Ate vegetables",
    "Avoided junk food",
    "Took meals on time",
  ],
  "Physical & Health Care": [
    "Did exercise/stretching",
    "Went for walk",
    "Took medicine (if prescribed)",
    "Took enough rest",
    "Felt physically active",
  ],
  "Mental Wellness": [
    "Practiced gratitude",
    "Did meditation/breathing",
    "Took breaks when overwhelmed",
    "Spoke kindly to self",
  ],
};

const englishChecks = [
  "Spoke in English with peers",
  "Spoke in English with facilitator",
  "Asked questions in English",
  "Read in English",
  "Wrote in English",
  "Watched/listened to English content",
];

const aiChecks = [
  "Used ChatGPT",
  "Used Claude",
  "Used Gemini",
  "Used Canva AI",
  "Used Translation tools",
  "Used AI for English practice",
  "Used AI for cooking theory",
  "Used AI for self-learning",
];

const theoryChecks = ["Took notes", "Asked doubts", "Revised topic", "Helped peers", "Completed assignment"];

const practicalChecks = [
  "Completed practical independently",
  "Needed facilitator support",
  "Followed safety and hygiene",
  "Cleaned workspace after practical",
  "Helped peers during practical",
];

const lifeSkillChecks = [
  "Time management",
  "Teamwork",
  "Leadership",
  "Communication confidence",
  "Problem solving",
  "Responsibility",
];

const campusChecks = [
  "Came on time",
  "Maintained discipline",
  "Respected peers",
  "Participated actively",
  "Followed instructions",
];

const cookingRatings = [
  "Taste",
  "Presentation",
  "Plating",
  "Texture",
  "Hygiene",
  "Time management",
  "Teamwork",
  "Creativity",
  "Cooking confidence",
];

const quotes = [
  "Small steps every day become strong habits.",
  "Progress is progress, even when it feels quiet.",
  "Ask, try, reflect, repeat. That is learning.",
  "Your effort today is building tomorrow's confidence.",
];

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm = {
  studentName: "",
  date: today(),
  facilitatorName: "",
  schoolName: "",
  attendance: "Present",
  mood: "Motivated",
  checks: {},
  waterIntake: "1.5 L",
  medicineName: "",
  medicineTime: "",
  missedDose: "No",
  emotionsToday: "",
  managedEmotions: "",
  askedForHelp: "",
  happyThing: "",
  challengeFaced: "",
  emotionalRating: 6,
  englishSpeaking: "40-60%",
  newWordsCount: "",
  newWords: "",
  newWordSentence: "",
  englishConfidence: 5,
  englishLevel: "Basic",
  aiToolsUsed: "",
  aiLearned: "",
  aiHelp: "",
  aiResponsible: "Yes",
  aiConfidence: 5,
  theoryTopic: "",
  theorySubtopic: "",
  theoryUnderstood: "",
  theoryDifficult: "",
  theoryCompletion: "50%",
  theoryUnderstanding: 5,
  practicalName: "",
  practicalSteps: "",
  practicalTools: "",
  practicalChallenges: "",
  practicalLearned: "",
  practicalCompletion: "50%",
  facilitatorCooking: Object.fromEntries(cookingRatings.map((item) => [item, 5])),
  practicalDoneWell: "",
  practicalNeedsImprovement: "",
  practicalConfidence: 5,
  proudToday: "",
  improveTomorrow: "",
  enjoyedMost: "",
  participation: "",
  discipline: "",
  communication: "",
  improvementAreas: "",
  additionalComments: "",
  studentSelfRating: 6,
  facilitatorRating: 6,
  dailyStatus: "Good",
};

function parsePercent(value) {
  if (!value) return 0;
  if (value.includes("-")) {
    const numbers = value.match(/\d+/g)?.map(Number) || [0];
    return Math.round(numbers.reduce((sum, number) => sum + number, 0) / numbers.length);
  }
  return Number(value.replace("%", "")) || 0;
}

function waterToNumber(value) {
  if (value === "500 ml") return 0.5;
  if (value === "3 L+") return 3;
  return Number(value.replace(" L", "")) || 0;
}

function getAllCheckLabels() {
  return [
    ...Object.values(selfCareChecks).flat(),
    ...englishChecks,
    ...aiChecks,
    ...theoryChecks,
    ...practicalChecks,
    ...lifeSkillChecks,
    ...campusChecks,
  ];
}

function getScore(entry) {
  const checkedLabels = getAllCheckLabels().filter((label) => entry.checks?.[label]);
  const checklistScore = Math.round((checkedLabels.length / getAllCheckLabels().length) * 100);
  const ratingScore = Math.round(
    ((Number(entry.emotionalRating) +
      Number(entry.englishConfidence) +
      Number(entry.aiConfidence) +
      Number(entry.theoryUnderstanding) +
      Number(entry.practicalConfidence) +
      Number(entry.studentSelfRating) +
      Number(entry.facilitatorRating)) /
      70) *
      100,
  );
  const completionScore = Math.round((parsePercent(entry.theoryCompletion) + parsePercent(entry.practicalCompletion)) / 2);
  return Math.round(checklistScore * 0.35 + ratingScore * 0.35 + completionScore * 0.3);
}

function normalizeEntry(entry) {
  return {
    ...entry,
    schoolName: entry.schoolName || entry.batchName || "",
    checks: entry.checks || {},
    facilitatorCooking: { ...emptyForm.facilitatorCooking, ...entry.facilitatorCooking },
  };
}

function averageScore(entries) {
  if (!entries.length) return 0;
  return Math.round(entries.reduce((sum, entry) => sum + getScore(entry), 0) / entries.length);
}

function daysAgo(count) {
  const date = new Date();
  date.setDate(date.getDate() - count);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isThisMonth(entry) {
  const entryDate = new Date(entry.date);
  const now = new Date();
  return entryDate.getFullYear() === now.getFullYear() && entryDate.getMonth() === now.getMonth();
}

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
    } catch {
      return null;
    }
  });
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [studentStep, setStudentStep] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const quote = useMemo(() => quotes[new Date().getDate() % quotes.length], []);
  const role = auth?.role || "student";

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setEntries(JSON.parse(saved).map(normalizeEntry));
      } catch {
        setEntries([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (auth) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
      localStorage.setItem(ROLE_KEY, auth.role);
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [auth]);

  useEffect(() => {
    if (!auth) return;
    setForm((current) => ({
      ...current,
      studentName: auth.role === "student" ? auth.name : current.studentName,
      facilitatorName: auth.role === "facilitator" ? auth.name : current.facilitatorName,
      schoolName: auth.schoolName || current.schoolName,
    }));
  }, [auth]);

  const filteredEntries = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    const visibleEntries =
      role === "facilitator" || !auth?.name
        ? entries
        : entries.filter((entry) => entry.studentName?.toLowerCase() === auth.name.trim().toLowerCase());
    if (!lowered) return visibleEntries;
    return visibleEntries.filter((entry) =>
      [entry.studentName, entry.facilitatorName, entry.schoolName, entry.date].some((value) =>
        String(value || "").toLowerCase().includes(lowered),
      ),
    );
  }, [entries, query, role, auth?.name]);

  const latestEntry = filteredEntries[0] || form;
  const weeklyEntries = filteredEntries.filter((entry) => new Date(entry.date) >= daysAgo(6)).slice(0, 7).reverse();
  const monthlyEntries = filteredEntries.filter(isThisMonth);
  const score = getScore(form);
  const dailyScore = getScore(latestEntry);
  const weeklyScore = averageScore(weeklyEntries);
  const monthlyScore = averageScore(monthlyEntries);
  const streak = useMemo(() => calculateStreak(entries), [entries]);
  const badges = getBadges(form, streak);
  const isStudent = role === "student";
  const isFacilitator = role === "facilitator";

  const login = (nextAuth) => {
    setAuth(nextAuth);
    setForm((current) => ({
      ...current,
      studentName: nextAuth.role === "student" ? nextAuth.name : current.studentName,
      facilitatorName: nextAuth.role === "facilitator" ? nextAuth.name : current.facilitatorName,
      schoolName: nextAuth.schoolName || current.schoolName,
    }));
  };

  const logout = () => {
    setAuth(null);
    setQuery("");
    setSavedMessage("");
    setForm({ ...emptyForm, date: today() });
  };

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleCheck = (label) => {
    setForm((current) => ({
      ...current,
      checks: { ...current.checks, [label]: !current.checks?.[label] },
    }));
  };

  const saveProgress = () => {
    const entry = { ...form, id: `${form.studentName || "student"}-${form.date}`, lastUpdatedBy: role, savedAt: new Date().toISOString() };
    setEntries((current) => {
      const withoutCurrent = current.filter((item) => item.id !== entry.id);
      return [entry, ...withoutCurrent].sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    setSavedMessage(isFacilitator ? "Facilitator feedback saved on this device." : "Student progress saved on this device.");
    setTimeout(() => setSavedMessage(""), 2200);
  };

  const loadEntry = (entry) => {
    setForm({ ...emptyForm, ...normalizeEntry(entry) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetToday = () => {
    setForm({
      ...emptyForm,
      date: today(),
      studentName: isStudent ? auth?.name || "" : "",
      facilitatorName: isFacilitator ? auth?.name || "" : "",
      schoolName: auth?.schoolName || "",
    });
  };

  const exportPdf = () => {
    window.print();
  };

  if (!auth) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#141413] transition-colors dark:bg-[#181715] dark:text-[#faf9f5]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-24 px-4 py-4 sm:px-6 lg:px-8">
        <header className="print-full py-4">
          <nav className="no-print mb-16 flex h-16 items-center justify-between gap-4 border-b border-[#e6dfd8] bg-[#faf9f5] dark:border-white/10 dark:bg-[#181715]">
            <div className="flex items-center gap-3">
              <span className="text-xl leading-none text-[#cc785c]">✣</span>
              <span className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Student Progress</span>
            </div>
            <div className="hidden items-center gap-6 text-sm font-medium text-[#6c6a64] md:flex">
              <span>{isStudent ? "Student form" : "Facilitator form"}</span>
              <span>Analytics</span>
              <span>Reports</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-[#efe9de] px-3 py-2 text-sm font-medium capitalize text-[#141413] dark:bg-[#252320] dark:text-[#faf9f5] md:inline-flex">
                {auth.name} • {role}
              </span>
              <button className="hidden text-sm font-medium text-[#141413] dark:text-[#faf9f5] sm:inline-flex" onClick={resetToday}>
                New day
              </button>
              <button className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]" onClick={logout}>
                Logout
              </button>
            </div>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#efe9de] px-4 py-2 text-[13px] font-medium text-[#141413] dark:bg-[#252320] dark:text-[#faf9f5]">
                <HeartHandshake size={16} />
                {isFacilitator ? "Facilitator feedback workspace" : "Warm daily learning tracker"}
              </div>
              <h1 className="font-display max-w-3xl text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-[#141413] dark:text-[#faf9f5] sm:text-6xl lg:text-[64px]">
                Student Progress Tracker
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#3d3d3a] dark:text-[#a09d96]">
                {isFacilitator
                  ? "Review daily progress, add facilitator feedback, and see every student's daily, weekly, and monthly progress."
                  : "A simple daily system for self-care, English confidence, AI practice, theory, practicals, and reflection."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-5 py-3 text-sm font-medium text-[#141413] dark:border-white/10 dark:bg-[#252320] dark:text-[#faf9f5]" onClick={exportPdf}>
                  Export report
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-[#181715] p-4 text-[#faf9f5]">
              <div className="rounded-xl border border-white/10 bg-[#1f1e1b] p-5">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs text-[#a09d96]">daily_tracker.session</span>
                  <span className="rounded-full bg-[#252320] px-3 py-1 text-xs font-medium text-[#5db8a6]">active</span>
                </div>
                <p className="text-sm leading-6 text-[#faf9f5]">{quote}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Metric label="Today" value={`${score}%`} tone="ink" />
                  <Metric label="Streak" value={`${streak} days`} tone="coral" />
                </div>
                <div className="mt-4 rounded-xl bg-[#252320] p-4 font-mono text-sm">
                  <div className="mb-3 flex justify-between text-xs text-[#a09d96]">
                    <span>learning_signal</span>
                    <span>{form.dailyStatus}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-[#cc785c]" style={{ width: `${score}%` }} />
                  </div>
                  <div className="mt-4 grid gap-2 text-[#a09d96]">
                    <span><span className="text-[#e8a55a]">daily</span>: {dailyScore}%</span>
                    <span><span className="text-[#5db8a6]">weekly</span>: {weeklyScore}%</span>
                    <span><span className="text-[#cc785c]">monthly</span>: {monthlyScore}%</span>
                    <span><span className="text-[#e8a55a]">self_care</span>: {sectionCompletion(form, Object.values(selfCareChecks).flat())}%</span>
                    <span><span className="text-[#5db8a6]">english</span>: {form.englishSpeaking}</span>
                    <span><span className="text-[#cc785c]">wellbeing</span>: {form.emotionalRating}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="no-print sticky top-0 z-20 -mx-4 border-y border-[#e6dfd8] bg-[#faf9f5]/95 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-[#181715]/95 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8b82]" size={18} />
              <input
                className="h-10 w-full rounded-lg border border-[#e6dfd8] bg-[#faf9f5] py-2 pl-10 pr-4 text-[#141413] outline-none transition focus:border-[#cc785c] focus:ring-4 focus:ring-[#cc785c]/15 dark:border-white/10 dark:bg-[#252320] dark:text-[#faf9f5]"
                placeholder="Search student, school, facilitator..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <ActionButton icon={Download} label="Export PDF" onClick={exportPdf} />
              <ActionButton icon={dark ? Sun : Moon} label={dark ? "Light" : "Dark"} onClick={() => setDark((value) => !value)} />
              <button
                className="h-10 rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-5 text-sm font-medium text-[#141413] dark:border-white/10 dark:bg-[#252320] dark:text-[#faf9f5]"
                onClick={resetToday}
              >
                New day
              </button>
            </div>
          </div>
          {savedMessage && <p className="mx-auto mt-2 max-w-[1200px] text-sm font-medium text-[#cc785c]">{savedMessage}</p>}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="grid gap-6">
            {isStudent ? (
              <StudentQuickFlow
                form={form}
                update={update}
                toggleCheck={toggleCheck}
                studentStep={studentStep}
                setStudentStep={setStudentStep}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                saveProgress={saveProgress}
              />
            ) : (
              <FacilitatorCompactFlow
                form={form}
                update={update}
                setForm={setForm}
                entries={filteredEntries}
                loadEntry={loadEntry}
                cookingRatings={cookingRatings}
                statusOptions={statusOptions}
                dailyScore={dailyScore}
                weeklyScore={weeklyScore}
                monthlyScore={monthlyScore}
                saveProgress={saveProgress}
              />
            )}
          </div>

          <aside className="grid content-start gap-6">
            <Card icon={BarChart3} title="9. Dashboard & Analytics" subtitle="Live summary from saved and current progress." dark>
              <div className="grid gap-4">
                <ProgressTile label="Overall progress" value={score} large dark />
                <ProgressTile label="Daily recorded progress" value={dailyScore} helper={`${filteredEntries.length ? latestEntry.date : "Today"}`} dark />
                <ProgressTile label="Weekly average progress" value={weeklyScore} helper={`${weeklyEntries.length} day${weeklyEntries.length === 1 ? "" : "s"}`} dark />
                <ProgressTile label="Monthly average progress" value={monthlyScore} helper={`${monthlyEntries.length} day${monthlyEntries.length === 1 ? "" : "s"}`} dark />
                <ProgressTile label="Water intake" value={Math.round((waterToNumber(form.waterIntake) / 3) * 100)} helper={form.waterIntake} dark />
                <ProgressTile label="English speaking" value={parsePercent(form.englishSpeaking)} dark />
                <ProgressTile label="Theory completion" value={parsePercent(form.theoryCompletion)} dark />
                <ProgressTile label="Practical completion" value={parsePercent(form.practicalCompletion)} dark />
                <ProgressTile label="Emotional wellbeing" value={Number(form.emotionalRating) * 10} helper={`${form.emotionalRating}/10`} dark />
                <ProgressTile label="AI confidence" value={Number(form.aiConfidence) * 10} helper={`${form.aiConfidence}/10`} dark />
              </div>
            </Card>

            <Card icon={Award} title="Achievement Badges" subtitle="Friendly wins appear as habits grow.">
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span key={badge} className="rounded-full bg-[#efe9de] px-3 py-2 text-[13px] font-medium text-[#141413] dark:bg-[#252320] dark:text-[#faf9f5]">
                    {badge}
                  </span>
                ))}
              </div>
            </Card>

            <Card icon={BarChart3} title="Weekly Progress Charts" subtitle="Saved entries show growth trends." dark>
              <MiniChart title="Overall" entries={weeklyEntries} getValue={getScore} dark />
              <MiniChart title="Water" entries={weeklyEntries} getValue={(entry) => Math.round((waterToNumber(entry.waterIntake) / 3) * 100)} dark />
              <MiniChart title="English" entries={weeklyEntries} getValue={(entry) => parsePercent(entry.englishSpeaking)} dark />
              <MiniChart title="Theory" entries={weeklyEntries} getValue={(entry) => parsePercent(entry.theoryCompletion)} dark />
              <MiniChart title="Practical" entries={weeklyEntries} getValue={(entry) => parsePercent(entry.practicalCompletion)} dark />
              <MiniChart title="Wellbeing" entries={weeklyEntries} getValue={(entry) => Number(entry.emotionalRating) * 10} dark />
              <MiniChart title="AI usage" entries={weeklyEntries} getValue={(entry) => aiChecks.filter((label) => entry.checks?.[label]).length * 12.5} dark />
              <AttendanceDots entries={weeklyEntries} dark />
            </Card>

            <Card icon={Search} title={isFacilitator ? "All Student Progress" : "My Saved Progress"} subtitle="Tap any saved day to review or update it.">
              <div className="grid gap-3">
                {filteredEntries.length === 0 && <p className="text-sm text-[#6c6a64] dark:text-[#a09d96]">No saved days yet. Fill the form and press Save.</p>}
                {filteredEntries.slice(0, isFacilitator ? 20 : 8).map((entry) => (
                  <button
                    key={entry.id}
                    className="rounded-xl border border-[#e6dfd8] bg-[#faf9f5] p-4 text-left transition dark:border-white/10 dark:bg-[#252320]"
                    onClick={() => loadEntry(entry)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-[#141413] dark:text-[#faf9f5]">{entry.studentName || "Unnamed student"}</p>
                        <p className="text-sm text-[#6c6a64] dark:text-[#a09d96]">
                          {entry.date} • {entry.schoolName || "No school"}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#cc785c] px-3 py-1 text-sm font-medium text-white">
                        {getScore(entry)}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Card({ icon: Icon, title, subtitle, children, dark = false }) {
  const shell = dark
    ? "print-full animate-rise rounded-xl bg-[#181715] p-6 text-[#faf9f5] sm:p-8"
    : "print-full animate-rise rounded-xl bg-[#efe9de] p-6 dark:bg-[#252320] sm:p-8";
  const iconShell = dark
    ? "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#252320] text-[#cc785c]"
    : "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#faf9f5] text-[#cc785c] dark:bg-[#181715] dark:text-[#cc785c]";
  const titleClass = dark
    ? "font-display text-3xl font-normal leading-tight tracking-[-0.02em] text-[#faf9f5]"
    : "font-display text-3xl font-normal leading-tight tracking-[-0.02em] text-[#141413] dark:text-[#faf9f5]";
  const subtitleClass = dark ? "mt-1 text-sm leading-6 text-[#a09d96]" : "mt-1 text-sm leading-6 text-[#6c6a64] dark:text-[#a09d96]";
  return (
    <section className={shell}>
      <div className="mb-5 flex items-start gap-3">
        <div className={iconShell}>
          <Icon size={22} />
        </div>
        <div>
          <h2 className={titleClass}>{title}</h2>
          <p className={subtitleClass}>{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function LoginScreen({ onLogin }) {
  const [loginRole, setLoginRole] = useState("student");
  const [name, setName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError("Please enter your name to continue.");
      return;
    }
    onLogin({
      id: `${loginRole}-${cleanName.toLowerCase().replace(/\s+/g, "-")}`,
      role: loginRole,
      name: cleanName,
      schoolName: schoolName.trim(),
      loggedInAt: new Date().toISOString(),
    });
  };

  return (
    <main className="min-h-screen bg-[#faf9f5] px-4 py-8 text-[#141413]">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1100px] items-center gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#efe9de] px-4 py-2 text-[13px] font-medium">
            <span className="text-[#cc785c]">✣</span>
            Role based access
          </div>
          <h1 className="font-display text-5xl font-normal leading-[1.05] tracking-[-0.03em] sm:text-[64px]">
            Login to your progress tracker
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#3d3d3a]">
            Students can fill their own daily progress. Facilitators can add feedback and review all student progress.
          </p>
        </section>

        <form className="rounded-2xl bg-[#efe9de] p-6 sm:p-8" onSubmit={submit}>
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-[#f5f0e8] p-2">
            {["student", "facilitator"].map((item) => (
              <button
                type="button"
                key={item}
                className={`h-11 rounded-lg text-sm font-medium capitalize ${
                  loginRole === item ? "bg-[#cc785c] text-white" : "text-[#6c6a64]"
                }`}
                onClick={() => setLoginRole(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            <Field label={loginRole === "student" ? "Student Name" : "Facilitator Name"} value={name} onChange={setName} placeholder="Enter your name" />
            <Field label="School Name" value={schoolName} onChange={setSchoolName} placeholder="Enter school name" />
          </div>

          {error && <p className="mt-4 text-sm font-medium text-[#c64545]">{error}</p>}

          <button className="mt-6 h-11 w-full rounded-lg bg-[#cc785c] px-5 text-sm font-medium text-white active:bg-[#a9583e]" type="submit">
            Continue as {loginRole}
          </button>

          <p className="mt-4 text-sm leading-6 text-[#6c6a64]">
            This login is local to this browser. It controls what forms and progress records are visible on this device.
          </p>
        </form>
      </div>
    </main>
  );
}

function FacilitatorFeedbackForm({ form, update, setForm, cookingRatings, statusOptions }) {
  return (
    <>
      <Card icon={Award} title="2. Facilitator Practical Evaluation" subtitle="Fill only the facilitator feedback and support details for this student.">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Which practical was observed?" value={form.practicalName} onChange={(value) => update("practicalName", value)} />
          <Select label="Practical Completion" value={form.practicalCompletion} options={completionOptions} onChange={(value) => update("practicalCompletion", value)} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cookingRatings.map((item) => (
            <Slider
              key={item}
              label={item}
              value={form.facilitatorCooking[item]}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  facilitatorCooking: { ...current.facilitatorCooking, [item]: value },
                }))
              }
            />
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Textarea label="What was done well?" value={form.practicalDoneWell} onChange={(value) => update("practicalDoneWell", value)} />
          <Textarea label="What needs improvement?" value={form.practicalNeedsImprovement} onChange={(value) => update("practicalNeedsImprovement", value)} />
        </div>
      </Card>

      <Card icon={HeartHandshake} title="3. Facilitator Reflection" subtitle="Record participation, discipline, communication, and support needs.">
        <div className="grid gap-4 md:grid-cols-2">
          <Textarea label="Student participation" value={form.participation} onChange={(value) => update("participation", value)} />
          <Textarea label="Student discipline" value={form.discipline} onChange={(value) => update("discipline", value)} />
          <Textarea label="Student communication" value={form.communication} onChange={(value) => update("communication", value)} />
          <Textarea label="Student improvement areas" value={form.improvementAreas} onChange={(value) => update("improvementAreas", value)} />
          <Textarea label="Additional comments" value={form.additionalComments} onChange={(value) => update("additionalComments", value)} />
        </div>
      </Card>

      <Card icon={BarChart3} title="4. Facilitator Daily Rating" subtitle="Finalize the support status for this daily record.">
        <div className="grid gap-4 md:grid-cols-3">
          <Slider label="Facilitator Rating" value={form.facilitatorRating} onChange={(value) => update("facilitatorRating", value)} />
          <Select label="Daily Status" value={form.dailyStatus} options={statusOptions} onChange={(value) => update("dailyStatus", value)} />
          <ProgressTile label="Current student progress" value={getScore(form)} />
        </div>
      </Card>
    </>
  );
}

function StudentQuickFlow({
  form,
  update,
  toggleCheck,
  studentStep,
  setStudentStep,
  showDetails,
  setShowDetails,
  saveProgress,
}) {
  const steps = ["Today", "Learning", "Reflection"];
  const quickHabits = ["Brushed teeth", "Took bath", "Ate breakfast", "Slept properly", "Did exercise/stretching"];

  return (
    <>
      <Card icon={UserRound} title="Daily Entry" subtitle={`Step ${studentStep + 1} of 3. Keep it quick and simple.`}>
        <div className="mb-6 grid gap-2 rounded-xl bg-[#f5f0e8] p-2 dark:bg-[#1f1e1b] sm:grid-cols-3">
          {steps.map((step, index) => (
            <button
              key={step}
              className={`h-10 rounded-lg text-sm font-medium ${
                studentStep === index ? "bg-[#cc785c] text-white" : "text-[#6c6a64] dark:text-[#a09d96]"
              }`}
              onClick={() => setStudentStep(index)}
            >
              {step}
            </button>
          ))}
        </div>

        {studentStep === 0 && (
          <div className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Student Name" value={form.studentName} onChange={(value) => update("studentName", value)} disabled />
              <Field label="Date" type="date" value={form.date} onChange={(value) => update("date", value)} />
              <Field label="School Name" value={form.schoolName} onChange={(value) => update("schoolName", value)} placeholder="School name" />
              <Select label="Attendance" value={form.attendance} options={attendance} onChange={(value) => update("attendance", value)} />
              <Select label="Mood" value={form.mood} options={moods} onChange={(value) => update("mood", value)} />
              <Select label="Water" value={form.waterIntake} options={waterOptions} onChange={(value) => update("waterIntake", value)} />
            </div>
            <Slider label="Emotional wellbeing" value={form.emotionalRating} onChange={(value) => update("emotionalRating", value)} />
            <CheckChips title="Quick self-care check" labels={quickHabits} checks={form.checks} onToggle={toggleCheck} />
          </div>
        )}

        {studentStep === 1 && (
          <div className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Select label="English speaking" value={form.englishSpeaking} options={englishPercentages} onChange={(value) => update("englishSpeaking", value)} />
              <Select label="Theory completion" value={form.theoryCompletion} options={completionOptions} onChange={(value) => update("theoryCompletion", value)} />
              <Select label="Practical completion" value={form.practicalCompletion} options={completionOptions} onChange={(value) => update("practicalCompletion", value)} />
              <Select
                label="AI used today?"
                value={form.aiToolsUsed || "No AI today"}
                options={["No AI today", "ChatGPT", "Claude", "Gemini", "Canva AI", "Translation tools", "Multiple tools"]}
                onChange={(value) => update("aiToolsUsed", value)}
              />
              <Field label="Theory topic" value={form.theoryTopic} onChange={(value) => update("theoryTopic", value)} placeholder="Topic name" />
              <Field label="Practical done" value={form.practicalName} onChange={(value) => update("practicalName", value)} placeholder="Practical name" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Slider label="English confidence" value={form.englishConfidence} onChange={(value) => update("englishConfidence", value)} />
              <Slider label="Practical confidence" value={form.practicalConfidence} onChange={(value) => update("practicalConfidence", value)} />
            </div>
          </div>
        )}

        {studentStep === 2 && (
          <div className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Textarea label="One thing I learned today" value={form.practicalLearned} onChange={(value) => update("practicalLearned", value)} />
              <Textarea label="One challenge I faced" value={form.challengeFaced} onChange={(value) => update("challengeFaced", value)} />
              <Textarea label="Do I need help?" value={form.askedForHelp} onChange={(value) => update("askedForHelp", value)} />
              <Textarea label="What am I proud of today?" value={form.proudToday} onChange={(value) => update("proudToday", value)} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Slider label="My overall rating" value={form.studentSelfRating} onChange={(value) => update("studentSelfRating", value)} />
              <Select label="Daily status" value={form.dailyStatus} options={statusOptions} onChange={(value) => update("dailyStatus", value)} />
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            className="h-10 rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-5 text-sm font-medium text-[#141413] disabled:opacity-40 dark:border-white/10 dark:bg-[#252320] dark:text-[#faf9f5]"
            disabled={studentStep === 0}
            onClick={() => setStudentStep(Math.max(0, studentStep - 1))}
          >
            Back
          </button>
          <div className="flex flex-wrap gap-3">
            <button
              className="h-10 rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-5 text-sm font-medium text-[#141413] dark:border-white/10 dark:bg-[#252320] dark:text-[#faf9f5]"
              onClick={() => setShowDetails((value) => !value)}
            >
              {showDetails ? "Hide details" : "Add optional details"}
            </button>
            {studentStep < steps.length - 1 ? (
              <button className="h-10 rounded-lg bg-[#cc785c] px-5 text-sm font-medium text-white" onClick={() => setStudentStep(studentStep + 1)}>
                Next
              </button>
            ) : (
              <button className="h-10 rounded-lg bg-[#cc785c] px-5 text-sm font-medium text-white" onClick={saveProgress}>
                Save daily entry
              </button>
            )}
          </div>
        </div>
      </Card>

      {showDetails && (
        <Card icon={Check} title="Optional Details" subtitle="Open only the sections that matter today.">
          <div className="grid gap-3">
            <DetailSection title="Self-care checklist">
              <div className="grid gap-5 lg:grid-cols-2">
                {Object.entries(selfCareChecks).map(([title, labels]) => (
                  <Checklist key={title} title={title} labels={labels} checks={form.checks} onToggle={toggleCheck} />
                ))}
              </div>
            </DetailSection>
            <DetailSection title="English vocabulary">
              <div className="grid gap-4 md:grid-cols-2">
                <Select label="English level" value={form.englishLevel} options={englishLevels} onChange={(value) => update("englishLevel", value)} />
                <Field label="New words count" type="number" value={form.newWordsCount} onChange={(value) => update("newWordsCount", value)} />
                <Textarea label="New words" value={form.newWords} onChange={(value) => update("newWords", value)} />
                <Textarea label="Use one new word in a sentence" value={form.newWordSentence} onChange={(value) => update("newWordSentence", value)} />
              </div>
            </DetailSection>
            <DetailSection title="Learning notes">
              <div className="grid gap-4 md:grid-cols-2">
                <Textarea label="What did I understand in theory?" value={form.theoryUnderstood} onChange={(value) => update("theoryUnderstood", value)} />
                <Textarea label="What was difficult in theory?" value={form.theoryDifficult} onChange={(value) => update("theoryDifficult", value)} />
                <Textarea label="Practical steps completed" value={form.practicalSteps} onChange={(value) => update("practicalSteps", value)} />
                <Textarea label="Tools/materials used" value={form.practicalTools} onChange={(value) => update("practicalTools", value)} />
              </div>
            </DetailSection>
            <DetailSection title="Activities and habits">
              <div className="grid gap-5 lg:grid-cols-2">
                <Checklist title="English practice" labels={englishChecks} checks={form.checks} onToggle={toggleCheck} />
                <Checklist title="AI tools" labels={aiChecks} checks={form.checks} onToggle={toggleCheck} />
                <Checklist title="Theory activities" labels={theoryChecks} checks={form.checks} onToggle={toggleCheck} />
                <Checklist title="Life skills" labels={lifeSkillChecks} checks={form.checks} onToggle={toggleCheck} />
              </div>
            </DetailSection>
          </div>
        </Card>
      )}
    </>
  );
}

function FacilitatorCompactFlow({
  form,
  update,
  setForm,
  entries,
  loadEntry,
  cookingRatings,
  statusOptions,
  dailyScore,
  weeklyScore,
  monthlyScore,
  saveProgress,
}) {
  return (
    <>
      <Card icon={UserRound} title="Student Review" subtitle="Select a saved student record or create feedback for a new daily record.">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Student Name" value={form.studentName} onChange={(value) => update("studentName", value)} placeholder="Enter student name" />
          <Field label="Date" type="date" value={form.date} onChange={(value) => update("date", value)} />
          <Field label="Facilitator Name" value={form.facilitatorName} onChange={(value) => update("facilitatorName", value)} disabled />
          <Field label="School Name" value={form.schoolName} onChange={(value) => update("schoolName", value)} placeholder="School name" />
          <Select label="Attendance" value={form.attendance} options={attendance} onChange={(value) => update("attendance", value)} />
          <Select label="Mood" value={form.mood} options={moods} onChange={(value) => update("mood", value)} />
        </div>
        {entries.length > 0 && (
          <div className="mt-5">
            <p className="mb-3 text-sm font-medium text-[#6c6a64] dark:text-[#a09d96]">Recent student records</p>
            <div className="grid gap-2">
              {entries.slice(0, 4).map((entry) => (
                <button
                  key={entry.id}
                  className="rounded-lg border border-[#e6dfd8] bg-[#faf9f5] p-3 text-left text-sm dark:border-white/10 dark:bg-[#1f1e1b]"
                  onClick={() => loadEntry(entry)}
                >
                  <span className="font-medium">{entry.studentName || "Unnamed student"}</span>
                  <span className="ml-2 text-[#6c6a64] dark:text-[#a09d96]">{entry.date} • {getScore(entry)}%</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card icon={BarChart3} title="Progress Snapshot" subtitle="A quick view before writing feedback.">
        <div className="grid gap-4 md:grid-cols-3">
          <ProgressTile label="Daily progress" value={dailyScore} />
          <ProgressTile label="Weekly average" value={weeklyScore} />
          <ProgressTile label="Monthly average" value={monthlyScore} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ProgressTile label="Theory completion" value={parsePercent(form.theoryCompletion)} />
          <ProgressTile label="Practical completion" value={parsePercent(form.practicalCompletion)} />
        </div>
      </Card>

      <Card icon={HeartHandshake} title="Facilitator Feedback" subtitle="Keep feedback short, specific, and supportive.">
        <div className="grid gap-4 md:grid-cols-2">
          <Select label="Daily status" value={form.dailyStatus} options={statusOptions} onChange={(value) => update("dailyStatus", value)} />
          <Slider label="Facilitator rating" value={form.facilitatorRating} onChange={(value) => update("facilitatorRating", value)} />
          <Textarea label="What was done well?" value={form.practicalDoneWell} onChange={(value) => update("practicalDoneWell", value)} />
          <Textarea label="What needs improvement?" value={form.practicalNeedsImprovement} onChange={(value) => update("practicalNeedsImprovement", value)} />
          <Textarea label="Support needed / next step" value={form.improvementAreas} onChange={(value) => update("improvementAreas", value)} />
          <Textarea label="Additional comments" value={form.additionalComments} onChange={(value) => update("additionalComments", value)} />
        </div>
        <DetailSection title="Detailed cooking practical ratings">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cookingRatings.map((item) => (
              <Slider
                key={item}
                label={item}
                value={form.facilitatorCooking[item]}
                onChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    facilitatorCooking: { ...current.facilitatorCooking, [item]: value },
                  }))
                }
              />
            ))}
          </div>
        </DetailSection>
        <div className="mt-6 flex justify-end">
          <button className="h-10 rounded-lg bg-[#cc785c] px-5 text-sm font-medium text-white" onClick={saveProgress}>
            Save facilitator feedback
          </button>
        </div>
      </Card>
    </>
  );
}

function CheckChips({ title, labels, checks, onToggle }) {
  return (
    <div className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
      <p className="mb-3 text-sm font-medium text-[#3d3d3a] dark:text-[#faf9f5]">{title}</p>
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => {
          const checked = Boolean(checks?.[label]);
          return (
            <button
              key={label}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                checked ? "bg-[#cc785c] text-white" : "bg-[#faf9f5] text-[#3d3d3a] dark:bg-[#252320] dark:text-[#faf9f5]"
              }`}
              onClick={() => onToggle(label)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DetailSection({ title, children }) {
  return (
    <details className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
      <summary className="cursor-pointer text-sm font-medium text-[#141413] dark:text-[#faf9f5]">{title}</summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

function RoleToggle({ role, onChange }) {
  return (
    <div className="flex rounded-lg border border-[#e6dfd8] bg-[#faf9f5] p-1 dark:border-white/10 dark:bg-[#252320]">
      {["student", "facilitator"].map((item) => (
        <button
          key={item}
          className={`h-8 rounded-md px-3 text-sm font-medium capitalize ${
            role === item ? "bg-[#cc785c] text-white" : "text-[#6c6a64] dark:text-[#a09d96]"
          }`}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "", disabled = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-[#3d3d3a] dark:text-[#faf9f5]">{label}</span>
      <input
        className="h-10 rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-4 text-[#141413] outline-none transition focus:border-[#cc785c] focus:ring-4 focus:ring-[#cc785c]/15 disabled:bg-[#e8e0d2] disabled:text-[#6c6a64] dark:border-white/10 dark:bg-[#181715] dark:text-[#faf9f5] dark:disabled:bg-[#252320]"
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-[#3d3d3a] dark:text-[#faf9f5]">{label}</span>
      <textarea
        className="min-h-24 resize-y rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-4 py-3 leading-6 text-[#141413] outline-none transition focus:border-[#cc785c] focus:ring-4 focus:ring-[#cc785c]/15 dark:border-white/10 dark:bg-[#181715] dark:text-[#faf9f5]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-[#3d3d3a] dark:text-[#faf9f5]">{label}</span>
      <select
        className="h-10 rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-4 text-[#141413] outline-none transition focus:border-[#cc785c] focus:ring-4 focus:ring-[#cc785c]/15 dark:border-white/10 dark:bg-[#181715] dark:text-[#faf9f5]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Slider({ label, value, onChange }) {
  return (
    <label className="grid gap-2 rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
      <span className="flex items-center justify-between gap-3 text-sm font-medium text-[#3d3d3a] dark:text-[#faf9f5]">
        {label}
        <strong className="rounded-full bg-[#faf9f5] px-3 py-1 text-xs font-medium text-[#cc785c] dark:bg-[#252320]">{value}/10</strong>
      </span>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-[#cc785c]"
      />
    </label>
  );
}

function Checklist({ title, labels, checks, onToggle }) {
  return (
    <div className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
      <h3 className="mb-3 text-lg font-medium text-[#141413] dark:text-[#faf9f5]">{title}</h3>
      <div className="grid gap-2">
        {labels.map((label) => {
          const checked = Boolean(checks?.[label]);
          return (
            <label
              key={label}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition ${
                checked
                  ? "border-[#cc785c] bg-[#cc785c] text-white"
                  : "border-[#e6dfd8] bg-[#faf9f5] text-[#3d3d3a] dark:border-white/10 dark:bg-[#252320] dark:text-[#faf9f5]"
              }`}
            >
              <input className="h-5 w-5 accent-[#cc785c]" type="checkbox" checked={checked} onChange={() => onToggle(label)} />
              {label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ProgressTile({ label, value, helper, large = false, dark = false }) {
  const cleanValue = Math.max(0, Math.min(100, Math.round(value || 0)));
  const shell = dark
    ? "rounded-xl bg-[#252320] p-4"
    : "rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]";
  const labelClass = dark ? "text-sm font-medium text-[#faf9f5]" : "text-sm font-medium text-[#3d3d3a] dark:text-[#faf9f5]";
  const valueClass = dark ? "font-mono text-sm text-[#cc785c]" : "font-mono text-sm text-[#cc785c]";
  const largeClass = dark
    ? "font-display mt-3 text-5xl font-normal tracking-[-0.02em] text-[#faf9f5]"
    : "font-display mt-3 text-5xl font-normal tracking-[-0.02em] text-[#141413] dark:text-[#faf9f5]";
  return (
    <div className={`${shell} ${large ? "text-center" : ""}`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className={labelClass}>{label}</p>
        <p className={valueClass}>{helper || `${cleanValue}%`}</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#e6dfd8] dark:bg-white/15">
        <div
          className="h-full rounded-full bg-[#cc785c] transition-all duration-500"
          style={{ width: `${cleanValue}%` }}
        />
      </div>
      {large && <p className={largeClass}>{cleanValue}%</p>}
    </div>
  );
}

function Metric({ label, value, tone }) {
  const classes =
    tone === "coral"
      ? "bg-[#cc785c] text-white"
      : "bg-[#252320] text-[#faf9f5]";
  return (
    <div className={`rounded-lg p-3 ${classes}`}>
      <p className="text-xs font-medium uppercase tracking-[1.5px]">{label}</p>
      <p className="font-display mt-1 text-3xl font-normal tracking-[-0.02em]">{value}</p>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, primary = false }) {
  return (
    <button
      className={`inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm font-medium transition ${
        primary
          ? "bg-[#cc785c] text-white active:bg-[#a9583e]"
          : "border border-[#e6dfd8] bg-[#faf9f5] text-[#141413] dark:border-white/10 dark:bg-[#252320] dark:text-[#faf9f5]"
      }`}
      onClick={onClick}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

function MiniChart({ title, entries, getValue, dark = false }) {
  const titleClass = dark ? "text-sm font-medium text-[#faf9f5]" : "text-sm font-medium text-[#3d3d3a] dark:text-[#faf9f5]";
  const containerClass = dark
    ? "flex h-24 items-end gap-2 overflow-x-auto rounded-xl bg-[#252320] p-3"
    : "flex h-24 items-end gap-2 overflow-x-auto rounded-xl bg-[#f5f0e8] p-3 dark:bg-[#1f1e1b]";
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <p className={titleClass}>{title}</p>
        <p className="text-xs font-medium uppercase tracking-[1.5px] text-[#8e8b82]">7 days</p>
      </div>
      <div className={containerClass}>
        {(entries.length ? entries : Array.from({ length: 7 })).map((entry, index) => {
          const value = entry ? Math.max(8, Math.min(100, getValue(entry))) : 8;
          return (
            <div key={entry?.id || index} className="flex flex-1 flex-col items-center gap-2">
              <div
                className={`w-full rounded-t transition-all ${entry ? "bg-[#cc785c]" : "bg-[#e6dfd8] dark:bg-white/10"}`}
                style={{ height: `${value}%` }}
                title={entry ? `${entry.date}: ${Math.round(value)}%` : "No saved data"}
              />
              <span className="font-mono text-[10px] uppercase text-[#8e8b82]">{entry ? new Date(entry.date).toLocaleDateString("en", { weekday: "short" }) : "-"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AttendanceDots({ entries, dark = false }) {
  const titleClass = dark ? "text-sm font-medium text-[#faf9f5]" : "text-sm font-medium text-[#3d3d3a] dark:text-[#faf9f5]";
  const containerClass = dark ? "flex flex-wrap gap-2 rounded-xl bg-[#252320] p-3" : "flex flex-wrap gap-2 rounded-xl bg-[#f5f0e8] p-3 dark:bg-[#1f1e1b]";
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className={titleClass}>Attendance tracker</p>
        <p className="text-xs font-medium uppercase tracking-[1.5px] text-[#8e8b82]">Present / Absent</p>
      </div>
      <div className={containerClass}>
        {(entries.length ? entries : Array.from({ length: 7 })).map((entry, index) => (
          <span
            key={entry?.id || index}
            className={`h-8 min-w-8 rounded-full px-3 py-1 text-center font-mono text-xs ${
              entry?.attendance === "Present"
                ? "bg-[#5db872] text-[#141413]"
                : entry
                  ? "bg-[#cc785c] text-white"
                  : "bg-[#e6dfd8] text-[#8e8b82] dark:bg-white/10"
            }`}
          >
            {entry ? entry.attendance[0] : "-"}
          </span>
        ))}
      </div>
    </div>
  );
}

function sectionCompletion(form, labels) {
  return Math.round((labels.filter((label) => form.checks?.[label]).length / labels.length) * 100);
}

function calculateStreak(entries) {
  if (!entries.length) return 0;
  const dates = new Set(entries.map((entry) => entry.date));
  let cursor = new Date(today());
  let streak = 0;
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function getBadges(form, streak) {
  const badges = [];
  if (streak >= 3) badges.push("3-day streak");
  if (form.attendance === "Present") badges.push("Present today");
  if (parsePercent(form.englishSpeaking) >= 60) badges.push("English effort");
  if (Number(form.emotionalRating) >= 7) badges.push("Wellbeing win");
  if (Number(form.aiConfidence) >= 7) badges.push("AI explorer");
  if (parsePercent(form.practicalCompletion) >= 75) badges.push("Practical progress");
  if (!badges.length) badges.push("Ready to begin");
  return badges;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
