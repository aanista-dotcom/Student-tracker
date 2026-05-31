const { useEffect, useMemo, useRef, useState } = React;

// Lucide-style line icons. Color follows the parent's text color via currentColor,
// so existing `text-[...]` classes on icon shells keep working.
function Icon({ children, className = "", size = 22, strokeWidth = 2 }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

const Award = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </Icon>
);
const BarChart3 = (props) => (
  <Icon {...props}>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </Icon>
);
const CalendarDays = (props) => (
  <Icon {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </Icon>
);
const Check = (props) => (
  <Icon {...props}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);
const CheckCircle = (props) => (
  <Icon {...props}>
    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
    <path d="m9 11 3 3L22 4" />
  </Icon>
);
const Download = (props) => (
  <Icon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </Icon>
);
const Flame = (props) => (
  <Icon {...props}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </Icon>
);
const HeartHandshake = (props) => (
  <Icon {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </Icon>
);
const Loader = (props) => (
  <Icon {...props}>
    <path d="M12 2v4" />
    <path d="m16.2 7.8 2.9-2.9" />
    <path d="M18 12h4" />
    <path d="m16.2 16.2 2.9 2.9" />
    <path d="M12 18v4" />
    <path d="m4.9 19.1 2.9-2.9" />
    <path d="M2 12h4" />
    <path d="m4.9 4.9 2.9 2.9" />
  </Icon>
);
const Moon = (props) => (
  <Icon {...props}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </Icon>
);
const Save = (props) => (
  <Icon {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </Icon>
);
const Search = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Icon>
);
const Sparkles = (props) => (
  <Icon {...props}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
  </Icon>
);
const Sun = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </Icon>
);
const UserRound = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </Icon>
);

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

// Color-code progress by value: green (strong) / gold (mid) / coral (low).
function progressColor(value) {
  if (value >= 75) return "#5b8c5a";
  if (value >= 40) return "#d9a441";
  return "#c96442";
}

// Animate a number from 0 to `target` once it mounts / when target changes.
function useCountUp(target, duration = 900) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const end = Number(target) || 0;
    const start = fromRef.current;
    if (reduce || start === end) {
      setDisplay(end);
      fromRef.current = end;
      return;
    }
    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(Math.round(start + (end - start) * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        fromRef.current = end;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return display;
}

// ---- Growing tree engine (pure canvas, no libraries) ----
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function mixHex(a, b, t) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Palette-aligned tree colors (warm-brown wood -> brand coral tips, accent greens, gold).
function treePalette(dark) {
  return dark
    ? {
        bgTop: "#202b33",
        bgBottom: "#1a1816",
        woodDark: "#4a3122",
        woodLight: "#c96442",
        greens: ["#6fa06a", "#5b8c5a", "#7cae74", "#86b97e", "#4f8050"],
        gold: "#e0b057",
        ground: "rgba(0, 0, 0, 0.28)",
      }
    : {
        bgTop: "#e8eef3",
        bgBottom: "#faf9f5",
        woodDark: "#5b3a29",
        woodLight: "#c96442",
        greens: ["#5b8c5a", "#6fa06a", "#4a7a49", "#7cae74", "#88b97f"],
        gold: "#d9a441",
        ground: "rgba(20, 20, 19, 0.10)",
      };
}

function buildTree({ rng, cx, baseY, trunkLen, trunkThick, maxDepth, spread, greens, gold }) {
  const branches = [];
  const leaves = [];
  const bands = maxDepth + 1;
  const branchSpan = 0.82; // branches finish growing by 82% of the timeline...
  function grow(x, y, angle, len, thick, depth) {
    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;
    const jitter = ((rng() * 0.4) / bands) * branchSpan;
    const tStart = (depth / bands) * branchSpan + jitter;
    const tEnd = Math.min(branchSpan, ((depth + 1) / bands) * branchSpan + jitter);
    branches.push({ x1: x, y1: y, x2: ex, y2: ey, thick, depth, tStart, tEnd });
    const terminal = depth >= maxDepth || thick < 1.3;
    if (terminal) {
      const n = 2 + Math.floor(rng() * 3);
      for (let i = 0; i < n; i++) {
        const useGold = rng() < 0.08;
        leaves.push({
          x: ex + (rng() - 0.5) * len * 0.6,
          y: ey + (rng() - 0.5) * len * 0.6,
          maxR: 4 + rng() * 6,
          color: useGold ? gold : greens[Math.floor(rng() * greens.length)],
          // ...leaves bloom in the remaining window after their branch finishes.
          tStart: Math.min(0.96, tEnd + rng() * 0.04),
        });
      }
      return;
    }
    const nChildren = depth < 3 && rng() < 0.3 ? 3 : 2;
    for (let i = 0; i < nChildren; i++) {
      let dir;
      if (nChildren === 2) dir = i === 0 ? -1 : 1;
      else dir = i === 0 ? -1 : i === 1 ? 1 : (rng() - 0.5) * 1.5;
      const angleOffset = (spread * 0.45 + rng() * spread * 0.5) * dir;
      const childLen = len * (0.72 + rng() * 0.12);
      const childThick = thick * (0.66 + rng() * 0.12);
      grow(ex, ey, angle + angleOffset, childLen, childThick, depth + 1);
    }
  }
  grow(cx, baseY, -Math.PI / 2 + (rng() - 0.5) * 0.06, trunkLen, trunkThick, 0);
  return { branches, leaves };
}

function useElementSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(update);
      ro.observe(el);
    } else {
      window.addEventListener("resize", update);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", update);
    };
  }, []);
  return [ref, size];
}

function GrowingTree({
  progress = 1,
  duration = 12000,
  dark = false,
  transparent = false,
  seed = 1,
  replayKey = 0,
  fullscreen = false,
  onDone,
}) {
  const [ref, size] = useElementSize();
  const canvasRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !size.width || !size.height) return;
    const ctx = canvas.getContext("2d");
    const w = size.width;
    const h = size.height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pal = treePalette(dark);
    const p = Math.max(0, Math.min(1, progress));
    const depth = fullscreen ? 9 : Math.round(3 + p * 5);
    const cx = w / 2;
    const baseY = h - Math.max(8, h * 0.02);
    const trunkLen = h * (fullscreen ? 0.2 : 0.22);
    const trunkThick = Math.max(5, h * (fullscreen ? 0.018 : 0.022));

    const rng = mulberry32(seed + replayKey * 1000 + depth);
    const { branches, leaves } = buildTree({
      rng,
      cx,
      baseY,
      trunkLen,
      trunkThick,
      maxDepth: depth,
      spread: 0.8,
      greens: pal.greens,
      gold: pal.gold,
    });

    const drawBackground = () => {
      if (transparent) {
        ctx.clearRect(0, 0, w, h);
        return;
      }
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, pal.bgTop);
      g.addColorStop(1, pal.bgBottom);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const render = (t) => {
      drawBackground();
      // soft ground shadow
      ctx.save();
      ctx.fillStyle = pal.ground;
      ctx.beginPath();
      ctx.ellipse(cx, baseY + 2, Math.max(20, w * 0.12), Math.max(5, h * 0.015), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // branches (parent-before-child draw order)
      ctx.lineCap = "round";
      for (let i = 0; i < branches.length; i++) {
        const b = branches[i];
        if (t < b.tStart) continue;
        const local = b.tEnd > b.tStart ? Math.min(1, (t - b.tStart) / (b.tEnd - b.tStart)) : 1;
        const e = easeOutCubic(local);
        const x2 = b.x1 + (b.x2 - b.x1) * e;
        const y2 = b.y1 + (b.y2 - b.y1) * e;
        ctx.strokeStyle = mixHex(pal.woodDark, pal.woodLight, depth ? b.depth / depth : 0);
        ctx.lineWidth = Math.max(0.6, b.thick);
        ctx.beginPath();
        ctx.moveTo(b.x1, b.y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      // leaves
      for (let i = 0; i < leaves.length; i++) {
        const lf = leaves[i];
        if (t < lf.tStart) continue;
        const local = Math.min(1, (t - lf.tStart) / 0.14);
        const r = lf.maxR * easeOutCubic(local);
        if (r <= 0.2) continue;
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = lf.color;
        ctx.beginPath();
        ctx.arc(lf.x, lf.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Always paint a first frame synchronously so the canvas is never blank,
    // even before the first animation frame fires.
    render(0);

    // If motion is reduced or the tab is hidden (rAF is paused), draw the
    // finished tree immediately instead of relying on the animation loop.
    if (reduce || document.hidden) {
      render(1);
      if (onDoneRef.current) onDoneRef.current();
      return;
    }

    let raf;
    let startTs = null;
    let finished = false;
    const loop = (ts) => {
      if (startTs === null) startTs = ts;
      const t = Math.min(1, (ts - startTs) / duration);
      render(t);
      if (t < 1) {
        raf = requestAnimationFrame(loop);
      } else if (!finished) {
        finished = true;
        if (onDoneRef.current) onDoneRef.current();
      }
    };
    raf = requestAnimationFrame(loop);

    // If the tab gets hidden mid-grow, jump to the finished tree so it isn't
    // frozen half-grown when the user returns.
    const onVisibility = () => {
      if (document.hidden && !finished) {
        finished = true;
        if (raf) cancelAnimationFrame(raf);
        render(1);
        if (onDoneRef.current) onDoneRef.current();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [size.width, size.height, progress, dark, seed, replayKey, duration, transparent, fullscreen]);

  return (
    <div ref={ref} className="absolute inset-0 h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

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

function getAppConfig() {
  return window.APP_CONFIG || {};
}

function getSupabaseClient() {
  const config = getAppConfig();
  if (config.persistenceMode !== "supabase" || !config.supabaseUrl || !config.supabaseAnonKey || !window.supabase) {
    return null;
  }
  if (!window.studentTrackerSupabaseClient) {
    window.studentTrackerSupabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  }
  return window.studentTrackerSupabaseClient;
}

function getSupabaseTable() {
  return getAppConfig().supabaseTable || "student_progress_entries";
}

function toDatabaseRow(entry, role) {
  return {
    id: entry.id,
    student_name: entry.studentName || "",
    facilitator_name: entry.facilitatorName || "",
    school_name: entry.schoolName || "",
    entry_date: entry.date || today(),
    last_updated_by: role || entry.lastUpdatedBy || "unknown",
    payload: entry,
    updated_at: new Date().toISOString(),
  };
}

async function loadCloudEntries() {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data, error } = await client
    .from(getSupabaseTable())
    .select("id,payload,entry_date,updated_at")
    .order("entry_date", { ascending: false });
  if (error) throw error;
  return (data || []).map((row) => normalizeEntry({ ...row.payload, id: row.id }));
}

async function upsertCloudEntry(entry, role) {
  const client = getSupabaseClient();
  if (!client) return { skipped: true };
  const { error } = await client.from(getSupabaseTable()).upsert(toDatabaseRow(entry, role), { onConflict: "id" });
  if (error) throw error;
  return { skipped: false };
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
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [storageMode, setStorageMode] = useState("local"); // local | cloud | error
  const [celebrate, setCelebrate] = useState(false);
  const [celebrateKey, setCelebrateKey] = useState(0);
  const [studentStep, setStudentStep] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const quote = useMemo(() => quotes[new Date().getDate() % quotes.length], []);
  const role = auth?.role || "student";

  useEffect(() => {
    let cancelled = false;
    const loadEntries = async () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      let localEntries = [];
      try {
        localEntries = saved ? JSON.parse(saved).map(normalizeEntry) : [];
        if (!cancelled) setEntries(localEntries);
        const cloudEntries = await loadCloudEntries();
        if (!cancelled && cloudEntries) {
          setEntries(cloudEntries);
          setStorageMode("cloud");
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudEntries));
        } else if (!cancelled) {
          setStorageMode("local");
        }
      } catch (error) {
        console.error("[persistence] Could not load cloud data. Local cache is still available.", error);
        if (!cancelled) {
          setEntries(localEntries);
          setStorageMode("error");
        }
      }
    };
    loadEntries();
    return () => {
      cancelled = true;
    };
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
  // Tree fullness reflects real progress: current score + logging streak.
  const treeProgress = Math.max(0.12, Math.min(1, 0.6 * (score / 100) + 0.4 * (Math.min(streak, 10) / 10)));

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

  const saveProgress = async () => {
    setSaveState("saving");
    const entry = { ...form, id: `${form.studentName || "student"}-${form.date}`, lastUpdatedBy: role, savedAt: new Date().toISOString() };
    setEntries((current) => {
      const withoutCurrent = current.filter((item) => item.id !== entry.id);
      return [entry, ...withoutCurrent].sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    try {
      const cloudSave = await upsertCloudEntry(entry, role);
      if (cloudSave.skipped) {
        setStorageMode("local");
        setSavedMessage(
          isFacilitator
            ? "Feedback saved on this device only (cloud not connected)."
            : "Saved on this device only (cloud not connected).",
        );
      } else {
        setStorageMode("cloud");
        setSavedMessage(
          isFacilitator
            ? `Feedback saved to the cloud for ${entry.studentName || "this student"}.`
            : "Saved to the cloud — your facilitator can now see this.",
        );
      }
      setSaveState("saved");
      setCelebrateKey((value) => value + 1);
      setCelebrate(true);
    } catch (error) {
      console.error("[persistence] Cloud save failed. Entry was kept in local browser backup.", error);
      setStorageMode("error");
      setSavedMessage("Saved on this device. Cloud sync failed — check your connection.");
      setSaveState("error");
    }
    setTimeout(() => {
      setSavedMessage("");
      setSaveState("idle");
    }, 2600);
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

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!auth) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#141413] transition-colors dark:bg-[#181715] dark:text-[#faf9f5]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-24 px-4 py-4 sm:px-6 lg:px-8">
        <header className="print-full relative overflow-hidden py-4">
          <div
            className="no-print pointer-events-none absolute inset-x-0 bottom-0 top-32 z-0 hidden opacity-40 dark:opacity-30 md:block"
            aria-hidden="true"
          >
            <GrowingTree progress={1} duration={14000} dark={dark} transparent seed={7} />
          </div>
          <div className="relative z-10">
          <nav className="no-print mb-16 flex h-16 items-center justify-between gap-4 border-b border-[#e6dfd8] bg-[#faf9f5] dark:border-white/10 dark:bg-[#181715]">
            <div className="flex items-center gap-3">
              <span className="text-xl leading-none text-[#cc785c]">✣</span>
              <span className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Student Progress</span>
            </div>
            <div className="hidden items-center gap-6 text-sm font-medium text-[#6c6a64] md:flex">
              <button className="transition hover:text-[#cc785c]" onClick={() => scrollToId("tracker")}>
                {isStudent ? "Student form" : "Facilitator form"}
              </button>
              <button className="transition hover:text-[#cc785c]" onClick={() => scrollToId("analytics")}>
                Analytics
              </button>
              <button className="transition hover:text-[#cc785c]" onClick={() => scrollToId("reports")}>
                Reports
              </button>
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
            <div className="flex flex-wrap items-center gap-2">
              <StorageBadge mode={storageMode} />
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
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div id="tracker" className="grid gap-6 scroll-mt-24">
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
                saveState={saveState}
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
                saveState={saveState}
              />
            )}
          </div>

          <aside className="grid content-start gap-6">
            <Card id="analytics" icon={BarChart3} title="Dashboard & Analytics" subtitle="Live summary from saved and current progress." dark>
              <div className="grid gap-4">
                <ProgressTile label="Overall progress" value={score} large dark index={0} />
                <ProgressTile label="Daily recorded progress" value={dailyScore} helper={`${filteredEntries.length ? latestEntry.date : "Today"}`} dark index={1} />
                <ProgressTile label="Weekly average progress" value={weeklyScore} helper={`${weeklyEntries.length} day${weeklyEntries.length === 1 ? "" : "s"}`} dark index={2} />
                <ProgressTile label="Monthly average progress" value={monthlyScore} helper={`${monthlyEntries.length} day${monthlyEntries.length === 1 ? "" : "s"}`} dark index={3} />
                <ProgressTile label="Water intake" value={Math.round((waterToNumber(form.waterIntake) / 3) * 100)} helper={form.waterIntake} dark index={4} />
                <ProgressTile label="English speaking" value={parsePercent(form.englishSpeaking)} dark index={5} />
                <ProgressTile label="Theory completion" value={parsePercent(form.theoryCompletion)} dark index={6} />
                <ProgressTile label="Practical completion" value={parsePercent(form.practicalCompletion)} dark index={7} />
                <ProgressTile label="Emotional wellbeing" value={Number(form.emotionalRating) * 10} helper={`${form.emotionalRating}/10`} dark index={8} />
                <ProgressTile label="AI confidence" value={Number(form.aiConfidence) * 10} helper={`${form.aiConfidence}/10`} dark index={9} />
              </div>
            </Card>

            <Card icon={Sparkles} title="Growth Garden" subtitle="Your tree grows as you log days and raise your scores.">
              <div className="relative h-72 overflow-hidden rounded-xl border border-[#e6dfd8] dark:border-white/10">
                <GrowingTree
                  progress={treeProgress}
                  duration={5500}
                  dark={dark}
                  seed={42}
                  replayKey={Math.round(treeProgress * 10)}
                />
                <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#141413]/70 px-3 py-1 text-xs font-medium tabular-nums text-white backdrop-blur">
                    {Math.round(treeProgress * 100)}% grown
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#141413]/70 px-3 py-1 text-xs font-medium tabular-nums text-white backdrop-blur">
                    <Flame size={13} className="text-[#e08968]" />
                    {streak}d
                  </span>
                </div>
              </div>
            </Card>

            <Card icon={Award} title="Achievement Badges" subtitle="Friendly wins appear as habits grow.">
              {streak > 0 && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#cc785c]/10 px-4 py-2 text-sm font-medium text-[#cc785c] dark:bg-[#cc785c]/15">
                  <Flame size={18} className="animate-float" />
                  <span className="tabular-nums">{streak}-day streak</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, i) => (
                  <span
                    key={badge}
                    className="animate-scale-in inline-flex items-center gap-1.5 rounded-full bg-[#efe9de] px-3 py-2 text-[13px] font-medium text-[#141413] dark:bg-[#252320] dark:text-[#faf9f5]"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <Check size={14} className="text-[#5b8c5a]" />
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

            <Card id="reports" icon={Search} title={isFacilitator ? "All Student Progress" : "My Saved Progress"} subtitle="Tap any saved day to review or export it as a PDF report.">
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
      <Toast message={savedMessage} state={saveState} />
      {celebrate && (
        <CelebrationOverlay dark={dark} replayKey={celebrateKey} onClose={() => setCelebrate(false)} />
      )}
    </main>
  );
}

function CelebrationOverlay({ dark, replayKey, onClose }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const close = () => {
    setShown(false);
    setTimeout(onClose, 450);
  };
  return (
    <div
      className={`no-print fixed inset-0 z-[60] cursor-pointer transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0"}`}
      onClick={close}
      role="dialog"
      aria-label="Progress celebration"
    >
      <GrowingTree
        progress={1}
        duration={9000}
        dark={dark}
        fullscreen
        seed={replayKey + 3}
        replayKey={replayKey}
        onDone={() => setTimeout(close, 1600)}
      />
      <div className="pointer-events-none absolute inset-x-0 top-12 flex flex-col items-center gap-2 px-4 text-center">
        <p className="font-display text-3xl font-normal tracking-[-0.02em] text-[#141413] dark:text-[#faf9f5] sm:text-4xl">
          Your progress is growing
        </p>
        <p className="text-sm text-[#3d3d3a] dark:text-[#a09d96]">Saved — watch your tree grow.</p>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation();
          close();
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-[#141413]/80 px-5 py-2 text-sm font-medium text-white backdrop-blur transition active:scale-95"
      >
        Tap anywhere to skip
      </button>
    </div>
  );
}

function StorageBadge({ mode }) {
  const map = {
    cloud: { text: "Cloud synced", color: "#5b8c5a", dot: "#5b8c5a", title: "Saved to the shared cloud database — facilitators can see student entries." },
    local: { text: "On this device", color: "#8e8b82", dot: "#d9a441", title: "Saved only in this browser. Cloud database is not connected." },
    error: { text: "Cloud error", color: "#c96442", dot: "#c96442", title: "Could not reach the cloud database. Entries are kept on this device for now." },
  };
  const m = map[mode] || map.local;
  return (
    <span
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-3 text-sm font-medium dark:border-white/10 dark:bg-[#252320]"
      title={m.title}
    >
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: m.dot }} />
      <span style={{ color: m.color }}>{m.text}</span>
    </span>
  );
}

function Toast({ message, state }) {
  if (!message) return null;
  const isError = state === "error";
  return (
    <div className="no-print pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div
        className="animate-toast-in pointer-events-auto flex items-center gap-3 rounded-xl bg-[#181715] px-5 py-3 text-sm font-medium text-[#faf9f5] shadow-lift dark:bg-[#252320]"
        role="status"
      >
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full"
          style={{ backgroundColor: isError ? "rgba(201,100,66,0.2)" : "rgba(91,140,90,0.2)" }}
        >
          {isError ? (
            <Sparkles size={16} className="text-[#c96442]" />
          ) : (
            <CheckCircle size={16} className="text-[#5b8c5a]" />
          )}
        </span>
        {message}
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, subtitle, children, dark = false, id }) {
  const shell = dark
    ? "print-full animate-rise scroll-mt-24 rounded-xl bg-[#181715] p-6 text-[#faf9f5] sm:p-8"
    : "print-full animate-rise scroll-mt-24 rounded-xl bg-[#efe9de] p-6 dark:bg-[#252320] sm:p-8";
  const iconShell = dark
    ? "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#252320] text-[#cc785c]"
    : "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#faf9f5] text-[#cc785c] dark:bg-[#181715] dark:text-[#cc785c]";
  const titleClass = dark
    ? "font-display text-3xl font-normal leading-tight tracking-[-0.02em] text-[#faf9f5]"
    : "font-display text-3xl font-normal leading-tight tracking-[-0.02em] text-[#141413] dark:text-[#faf9f5]";
  const subtitleClass = dark ? "mt-1 text-sm leading-6 text-[#a09d96]" : "mt-1 text-sm leading-6 text-[#6c6a64] dark:text-[#a09d96]";
  return (
    <section className={shell} id={id}>
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
  saveState,
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
              <SaveButton onClick={saveProgress} state={saveState} label="Save daily entry" />
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

function ReadField({ label, value }) {
  if (value === undefined || value === null || String(value).trim() === "") return null;
  return (
    <div className="rounded-lg bg-[#f5f0e8] p-3 dark:bg-[#1f1e1b]">
      <p className="text-xs font-medium uppercase tracking-[1px] text-[#8e8b82]">{label}</p>
      <p className="mt-1 text-sm leading-6 text-[#141413] dark:text-[#faf9f5]">{value}</p>
    </div>
  );
}

function SectionBar({ label, value }) {
  const v = Math.max(0, Math.min(100, Math.round(value || 0)));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-[#3d3d3a] dark:text-[#a09d96]">{label}</span>
        <span className="font-mono tabular-nums" style={{ color: progressColor(v) }}>{v}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#e6dfd8] dark:bg-white/15">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${v}%`, backgroundColor: progressColor(v) }}
        />
      </div>
    </div>
  );
}

// Read-only view of what a student actually submitted, for facilitators.
function StudentSubmissionView({ form }) {
  const loaded = Boolean(form.id || form.savedAt);
  if (!loaded) {
    return (
      <Card icon={UserRound} title="Student Submission" subtitle="See exactly what a student filled in.">
        <p className="rounded-xl bg-[#f5f0e8] p-4 text-sm leading-6 text-[#6c6a64] dark:bg-[#1f1e1b] dark:text-[#a09d96]">
          Pick a student from <span className="font-medium">“Recent student records”</span> above, or from{" "}
          <span className="font-medium">“All Student Progress”</span> on the right, to see their answers, checklists,
          reflections, and overall progress here.
        </p>
      </Card>
    );
  }
  const overall = getScore(form);
  const sections = [
    { label: "Self-care & wellbeing", value: sectionCompletion(form, Object.values(selfCareChecks).flat()) },
    { label: "English practice", value: sectionCompletion(form, englishChecks) },
    { label: "AI tools", value: sectionCompletion(form, aiChecks) },
    { label: "Theory", value: sectionCompletion(form, theoryChecks) },
    { label: "Practical", value: sectionCompletion(form, practicalChecks) },
    { label: "Life skills", value: sectionCompletion(form, lifeSkillChecks) },
    { label: "Campus discipline", value: sectionCompletion(form, campusChecks) },
  ];
  return (
    <Card
      icon={UserRound}
      title="Student Submission"
      subtitle={`What ${form.studentName || "the student"} filled in on ${form.date}.`}
    >
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-[#181715] p-4 text-center text-[#faf9f5]">
          <p className="text-xs uppercase tracking-[1.5px] text-[#a09d96]">Overall</p>
          <p className="font-display text-4xl tabular-nums" style={{ color: progressColor(overall) }}>
            {overall}%
          </p>
        </div>
        <ReadField label="Attendance" value={form.attendance} />
        <ReadField label="Mood" value={form.mood} />
        <ReadField label="Water intake" value={form.waterIntake} />
      </div>

      <p className="mb-3 text-sm font-medium text-[#6c6a64] dark:text-[#a09d96]">Checklist completion</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {sections.map((section) => (
          <SectionBar key={section.label} label={section.label} value={section.value} />
        ))}
      </div>

      <p className="mb-3 mt-6 text-sm font-medium text-[#6c6a64] dark:text-[#a09d96]">Student self-ratings (out of 10)</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <ReadField label="Wellbeing" value={`${form.emotionalRating}/10`} />
        <ReadField label="English confidence" value={`${form.englishConfidence}/10`} />
        <ReadField label="AI confidence" value={`${form.aiConfidence}/10`} />
        <ReadField label="Theory understanding" value={`${form.theoryUnderstanding}/10`} />
        <ReadField label="Practical confidence" value={`${form.practicalConfidence}/10`} />
        <ReadField label="Self rating" value={`${form.studentSelfRating}/10`} />
      </div>

      <p className="mb-3 mt-6 text-sm font-medium text-[#6c6a64] dark:text-[#a09d96]">In the student's words</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <ReadField label="Proud of today" value={form.proudToday} />
        <ReadField label="Wants to improve tomorrow" value={form.improveTomorrow} />
        <ReadField label="Enjoyed most" value={form.enjoyedMost} />
        <ReadField label="A happy thing" value={form.happyThing} />
        <ReadField label="A challenge faced" value={form.challengeFaced} />
        <ReadField label="Emotions today" value={form.emotionsToday} />
        <ReadField label="New words learned" value={form.newWords} />
        <ReadField label="Theory topic" value={form.theoryTopic} />
        <ReadField label="Practical / dish" value={form.practicalName} />
        <ReadField label="AI tools used" value={form.aiToolsUsed} />
      </div>
    </Card>
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
  saveState,
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

      <StudentSubmissionView form={form} />

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
          <SaveButton onClick={saveProgress} state={saveState} label="Save facilitator feedback" />
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

function RadialProgress({ value, size = 132, stroke = 12, track = "rgba(255,255,255,0.12)" }) {
  const animated = useCountUp(value);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;
  const color = progressColor(value);
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-4xl font-normal tracking-[-0.02em] tabular-nums" style={{ color }}>
          {animated}%
        </span>
      </div>
    </div>
  );
}

function ProgressTile({ label, value, helper, large = false, dark = false, index = 0 }) {
  const cleanValue = Math.max(0, Math.min(100, Math.round(value || 0)));
  const shell = dark
    ? "animate-rise rounded-xl bg-[#252320] p-4"
    : "animate-rise rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]";
  const labelClass = dark ? "text-sm font-medium text-[#faf9f5]" : "text-sm font-medium text-[#3d3d3a] dark:text-[#faf9f5]";
  const valueClass = "font-mono text-sm tabular-nums";
  const stagger = { animationDelay: `${index * 60}ms` };

  if (large) {
    return (
      <div className={`${shell} flex flex-col items-center gap-3 text-center`} style={stagger}>
        <p className={labelClass}>{label}</p>
        <RadialProgress value={cleanValue} />
        {helper && <p className="font-mono text-xs uppercase tracking-[1.5px] text-[#a09d96]">{helper}</p>}
      </div>
    );
  }

  return (
    <div className={shell} style={stagger}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className={labelClass}>{label}</p>
        <p className={valueClass} style={{ color: progressColor(cleanValue) }}>{helper || `${cleanValue}%`}</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#e6dfd8] dark:bg-white/15">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${cleanValue}%`, backgroundColor: progressColor(cleanValue) }}
        />
      </div>
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
      className={`inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm font-medium transition active:scale-95 ${
        primary
          ? "bg-[#cc785c] text-white hover:bg-[#a9583e] active:bg-[#a9583e]"
          : "border border-[#e6dfd8] bg-[#faf9f5] text-[#141413] hover:border-[#cc785c]/40 dark:border-white/10 dark:bg-[#252320] dark:text-[#faf9f5]"
      }`}
      onClick={onClick}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}

function SaveButton({ onClick, state = "idle", label = "Save" }) {
  const saving = state === "saving";
  const saved = state === "saved";
  return (
    <button
      className={`inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm font-medium text-white transition active:scale-95 disabled:opacity-90 ${
        saved ? "bg-[#5b8c5a]" : "bg-[#cc785c] hover:bg-[#a9583e]"
      }`}
      onClick={onClick}
      disabled={saving}
    >
      {saving ? (
        <>
          <Loader size={16} className="animate-spin" />
          Saving…
        </>
      ) : saved ? (
        <>
          <Check size={16} />
          Saved
        </>
      ) : (
        <>
          <Save size={16} />
          {label}
        </>
      )}
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
                className={`w-full rounded-md transition-all duration-700 ease-out ${entry ? "" : "bg-[#e6dfd8] dark:bg-white/10"}`}
                style={{ height: `${value}%`, backgroundColor: entry ? progressColor(value) : undefined }}
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
