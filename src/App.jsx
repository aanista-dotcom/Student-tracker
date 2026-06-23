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
const LogOut = (props) => (
  <Icon {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
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
const Lock = (props) => (
  <Icon {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
  weeklyFeedback: "",
  monthlyFeedback: "",
  strengthHighlights: "",
  suggestedImprovements: "",
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
// Slight overshoot so leaves "pop" in — feels more rewarding.
const easeOutBack = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

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
  duration = 6000,
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
        const local = Math.min(1, (t - lf.tStart) / 0.18);
        const r = lf.maxR * easeOutBack(local);
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
      render(easeOutCubic(t));
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
  const text = String(value);
  if (text.includes("-")) {
    const numbers = text.match(/\d+/g)?.map(Number) || [0];
    return Math.round(numbers.reduce((sum, number) => sum + number, 0) / numbers.length);
  }
  return Number(text.replace("%", "")) || 0;
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

const categoryMeta = [
  { key: "practicals", label: "Practicals", shortLabel: "Practical", color: "#c96442" },
  { key: "english", label: "English", shortLabel: "English", color: "#5d8db8" },
  { key: "theory", label: "Theory", shortLabel: "Theory", color: "#d9a441" },
  { key: "wellness", label: "Wellness / Self-Care", shortLabel: "Wellness", color: "#5b8c5a" },
];

const categoryOptions = ["Overall", ...categoryMeta.map((category) => category.label)];

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function averageScores(values) {
  const clean = values
    .filter((value) => value !== null && value !== undefined && value !== "")
    .map(Number)
    .filter(Number.isFinite)
    .map(clampScore);
  if (!clean.length) return 0;
  return clampScore(clean.reduce((sum, value) => sum + value, 0) / clean.length);
}

function checklistPercent(entry, labels) {
  if (!labels.length) return 0;
  return clampScore((labels.filter((label) => entry.checks?.[label]).length / labels.length) * 100);
}

function averageCookingScore(entry) {
  const ratings = Object.values(entry.facilitatorCooking || {}).map(Number).filter(Number.isFinite);
  if (!ratings.length) return null;
  return clampScore((ratings.reduce((sum, value) => sum + value, 0) / ratings.length) * 10);
}

function getCategoryScores(entry = emptyForm) {
  const safeEntry = normalizeEntry({ ...emptyForm, ...entry });
  const selfCareLabels = Object.values(selfCareChecks).flat();
  const newWordsScore = safeEntry.newWordsCount === "" ? null : Math.min(100, Number(safeEntry.newWordsCount) * 10);
  return {
    practicals: averageScores([
      parsePercent(safeEntry.practicalCompletion),
      Number(safeEntry.practicalConfidence) * 10,
      checklistPercent(safeEntry, practicalChecks),
      averageCookingScore(safeEntry),
    ]),
    english: averageScores([
      parsePercent(safeEntry.englishSpeaking),
      Number(safeEntry.englishConfidence) * 10,
      checklistPercent(safeEntry, englishChecks),
      newWordsScore,
    ]),
    theory: averageScores([
      parsePercent(safeEntry.theoryCompletion),
      Number(safeEntry.theoryUnderstanding) * 10,
      checklistPercent(safeEntry, theoryChecks),
    ]),
    wellness: averageScores([
      checklistPercent(safeEntry, selfCareLabels),
      Number(safeEntry.emotionalRating) * 10,
      clampScore((waterToNumber(safeEntry.waterIntake) / 3) * 100),
      safeEntry.attendance === "Present" ? 100 : 0,
    ]),
  };
}

function getOverallProgress(entry) {
  return averageScores(Object.values(getCategoryScores(entry)));
}

function getCompletionStatus(value) {
  const score = clampScore(value);
  if (score >= 85) return "Completed";
  if (score >= 70) return "On track";
  if (score >= 50) return "In progress";
  return "Needs support";
}

function getCategoryKeyFromLabel(label) {
  if (label === "Overall") return "overall";
  return categoryMeta.find((category) => category.label === label)?.key || "overall";
}

function getCategoryValue(entry, categoryKey = "overall") {
  if (categoryKey === "overall") return getOverallProgress(entry);
  return getCategoryScores(entry)[categoryKey] || 0;
}

function sortByDateAsc(entries) {
  return [...entries].sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
}

function sortByDateDesc(entries) {
  return [...entries].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

function trendFromValues(values) {
  const clean = values.map(Number).filter(Number.isFinite);
  if (clean.length < 2) return { delta: 0, label: "No trend yet", tone: "#8e8b82" };
  const delta = Math.round(clean[clean.length - 1] - clean[0]);
  if (delta > 0) return { delta, label: `+${delta}% growth`, tone: "#5b8c5a" };
  if (delta < 0) return { delta, label: `${delta}% dip`, tone: "#c96442" };
  return { delta: 0, label: "Stable", tone: "#d9a441" };
}

function trendForEntries(entries, categoryKey = "overall") {
  return trendFromValues(sortByDateAsc(entries).map((entry) => getCategoryValue(entry, categoryKey)));
}

function chartSeries(entries, categoryKey = "overall", fallbackEntry = null) {
  const source = entries.length ? sortByDateAsc(entries) : fallbackEntry ? [fallbackEntry] : [];
  return source.map((entry) => ({
    id: entry.id || `${entry.studentName || "student"}-${entry.date}`,
    label: entry.date ? new Date(entry.date).toLocaleDateString("en", { month: "short", day: "numeric" }) : "Today",
    value: getCategoryValue(entry, categoryKey),
    entry,
  }));
}

function getCompletedTasks(entry) {
  const checkedTasks = Object.entries(entry.checks || {})
    .filter(([, checked]) => checked)
    .map(([label]) => label);
  const learningTasks = [];
  if (parsePercent(entry.practicalCompletion) >= 75) learningTasks.push(`Practical: ${entry.practicalName || "work completed"}`);
  if (parsePercent(entry.theoryCompletion) >= 75) learningTasks.push(`Theory: ${entry.theoryTopic || "topic completed"}`);
  if (parsePercent(entry.englishSpeaking) >= 60) learningTasks.push("English speaking practice");
  if (entry.practicalLearned) learningTasks.push(`Learned: ${entry.practicalLearned}`);
  return [...learningTasks, ...checkedTasks].slice(0, 10);
}

function uniqueNonEmpty(values, limit = 8) {
  const seen = new Set();
  return values
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .filter((value) => {
      const key = value.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

function getSkillsLearned(entries) {
  return uniqueNonEmpty(
    entries.flatMap((entry) => [
      entry.practicalLearned,
      entry.practicalName,
      entry.theoryTopic,
      entry.theorySubtopic,
      entry.newWords,
      entry.aiLearned,
    ]),
    10,
  );
}

function hasFeedback(entry) {
  return [
    entry.practicalDoneWell,
    entry.practicalNeedsImprovement,
    entry.improvementAreas,
    entry.additionalComments,
    entry.weeklyFeedback,
    entry.monthlyFeedback,
    entry.strengthHighlights,
    entry.suggestedImprovements,
    entry.participation,
    entry.discipline,
    entry.communication,
  ].some((value) => String(value || "").trim()) || Number(entry.facilitatorRating) !== Number(emptyForm.facilitatorRating);
}

function getFeedbackEntries(entries) {
  return sortByDateDesc(entries.filter(hasFeedback));
}

function monthKey(dateString) {
  if (!dateString) return "Unknown";
  return dateString.slice(0, 7);
}

function monthLabel(key) {
  if (key === "Unknown") return "Unknown";
  const date = new Date(`${key}-01T00:00:00`);
  return date.toLocaleDateString("en", { month: "short", year: "2-digit" });
}

function getMonthlySummaries(entries) {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = monthKey(entry.date);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  });
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([key, group]) => {
      const categoryAverages = Object.fromEntries(
        categoryMeta.map((category) => [
          category.key,
          averageScores(group.map((entry) => getCategoryScores(entry)[category.key])),
        ]),
      );
      return {
        id: key,
        label: monthLabel(key),
        entries: group,
        overall: averageScores(group.map(getOverallProgress)),
        performance: averageScore(group),
        attendance: clampScore((group.filter((entry) => entry.attendance === "Present").length / Math.max(1, group.length)) * 100),
        categories: categoryAverages,
      };
    });
}

function getStudentSummaries(entries) {
  const groups = new Map();
  entries.forEach((entry) => {
    const name = entry.studentName || "Unnamed student";
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(entry);
  });
  return [...groups.entries()]
    .map(([name, group]) => {
      const sorted = sortByDateDesc(group);
      const categories = Object.fromEntries(
        categoryMeta.map((category) => [
          category.key,
          averageScores(group.map((entry) => getCategoryScores(entry)[category.key])),
        ]),
      );
      return {
        name,
        batch: sorted[0]?.schoolName || "No batch",
        latest: sorted[0],
        records: group.length,
        overall: averageScores(group.map(getOverallProgress)),
        performance: averageScore(group),
        attendance: clampScore((group.filter((entry) => entry.attendance === "Present").length / Math.max(1, group.length)) * 100),
        categories,
      };
    })
    .sort((a, b) => b.overall - a.overall);
}

function getMilestones(entries, currentEntry, streak) {
  const currentScores = getCategoryScores(currentEntry);
  const completed = [];
  const upcoming = [];
  if (entries.length > 0) completed.push({ title: "First progress entry", detail: `${entries.length} saved record${entries.length === 1 ? "" : "s"}` });
  if (streak >= 3) completed.push({ title: "3 day streak", detail: `${streak} days in a row` });
  if (streak < 3) upcoming.push({ title: "Build a 3 day streak", detail: `${Math.max(0, 3 - streak)} more day${3 - streak === 1 ? "" : "s"}` });
  categoryMeta.forEach((category) => {
    const value = currentScores[category.key] || 0;
    if (value >= 80) {
      completed.push({ title: `${category.shortLabel} milestone`, detail: `${value}% - ${getCompletionStatus(value)}`, color: category.color });
    } else {
      upcoming.push({ title: `${category.shortLabel} goal`, detail: `${Math.max(0, 80 - value)}% to reach 80%`, color: category.color });
    }
  });
  return { completed: completed.slice(0, 6), upcoming: upcoming.slice(0, 6) };
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

// Only accounts on this email domain may sign in (default: navgurukul.org).
function getAllowedDomain() {
  return String(getAppConfig().allowedEmailDomain || "navgurukul.org").trim().toLowerCase();
}

function isAllowedEmail(email) {
  const lower = String(email || "").trim().toLowerCase();
  return lower.endsWith("@" + getAllowedDomain());
}

// Role rule (confirmed with the team):
//   - Students have a number in the part before "@" (their join year), e.g. aanistamalik22@navgurukul.org
//   - Facilitators have no number, e.g. aanista@navgurukul.org
// Optional facilitatorEmails / studentEmails lists in config.js override this for rare exceptions.
function detectRoleFromEmail(email) {
  const lower = String(email || "").trim().toLowerCase();
  const config = getAppConfig();
  const facilitators = (config.facilitatorEmails || []).map((item) => String(item).toLowerCase());
  const students = (config.studentEmails || []).map((item) => String(item).toLowerCase());
  if (facilitators.includes(lower)) return "facilitator";
  if (students.includes(lower)) return "student";
  const localPart = lower.split("@")[0] || "";
  return /\d/.test(localPart) ? "student" : "facilitator";
}

// Build the app's existing auth shape from a signed-in Supabase/Google user.
function authFromSupabaseUser(user) {
  if (!user) return null;
  const email = user.email || "";
  const meta = user.user_metadata || {};
  return {
    id: user.id,
    email,
    role: detectRoleFromEmail(email),
    name: meta.full_name || meta.name || email.split("@")[0] || "User",
    schoolName: "",
    loggedInAt: new Date().toISOString(),
  };
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

function toDatabaseRow(entry, updatedBy) {
  return {
    id: entry.id,
    student_name: entry.studentName || "",
    facilitator_name: entry.facilitatorName || "",
    school_name: entry.schoolName || "",
    entry_date: entry.date || today(),
    last_updated_by: updatedBy || entry.lastUpdatedBy || "unknown",
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

async function upsertCloudEntry(entry, updatedBy) {
  const client = getSupabaseClient();
  if (!client) return { skipped: true };
  const { error } = await client.from(getSupabaseTable()).upsert(toDatabaseRow(entry, updatedBy), { onConflict: "id" });
  if (error) throw error;
  return { skipped: false };
}

async function loadReports() {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data, error } = await client
    .from("daily_reports")
    .select("*")
    .order("report_date", { ascending: false })
    .limit(500);
  if (error) throw error;
  return data || [];
}

// Build the display-ready report payload the daily-report Edge Function consumes.
// Reuses the existing scoring helpers so we never duplicate that logic server-side.
function buildReportPayload(entry, role) {
  const e = normalizeEntry({ ...emptyForm, ...entry });
  const selfCareLabels = Object.values(selfCareChecks).flat();
  const aiToolsChecked = aiChecks.filter((label) => e.checks?.[label]);
  return {
    mode: role === "facilitator" ? "facilitator" : "student",
    entryId: e.id || `${e.studentName || "student"}-${e.date}`,
    studentName: e.studentName || "",
    studentEmail: e.studentEmail || "",
    schoolName: e.schoolName || "",
    date: e.date,
    attendance: e.attendance,
    overallScore: getScore(e),
    categoryScores: getCategoryScores(e),
    selfCare: { percent: checklistPercent(e, selfCareLabels), mood: e.mood, water: e.waterIntake, emotionalRating: e.emotionalRating },
    english: { speaking: e.englishSpeaking, level: e.englishLevel, confidence: e.englishConfidence, newWords: e.newWords },
    theory: { topic: e.theoryTopic, completion: e.theoryCompletion, understanding: e.theoryUnderstanding },
    practical: { name: e.practicalName, completion: e.practicalCompletion, confidence: e.practicalConfidence },
    aiUsage: { tools: e.aiToolsUsed || aiToolsChecked.join(", "), learned: e.aiLearned, confidence: e.aiConfidence },
    studentSelfRating: e.studentSelfRating,
    facilitatorRating: e.facilitatorRating,
    facilitatorComplete: hasFeedback(e),
    facilitatorFeedback: {
      strengths: e.strengthHighlights || e.practicalDoneWell || "",
      improvements: e.suggestedImprovements || e.practicalNeedsImprovement || e.improvementAreas || "",
      comments: e.additionalComments || "",
      participation: e.participation || "",
      discipline: e.discipline || "",
      communication: e.communication || "",
    },
  };
}

// Fire-and-forget: ask the Edge Function to build the AI summary, store the report, and
// (for student submissions) email the Program Heads. Never blocks or breaks saving.
async function sendDailyReport(entry, role, studentEmail) {
  const client = getSupabaseClient();
  if (!client) return;
  try {
    const payload = buildReportPayload(entry, role);
    if (studentEmail) payload.studentEmail = studentEmail;
    await client.functions.invoke("daily-report", { body: payload });
  } catch (error) {
    console.error("[reports] Daily report could not be generated/sent (the saved entry is unaffected).", error);
  }
}

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [auth, setAuth] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [storageMode, setStorageMode] = useState("local"); // local | cloud | error
  const [celebrate, setCelebrate] = useState(false);
  const [celebrateKey, setCelebrateKey] = useState(0);
  const [studentStep, setStudentStep] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [reportView, setReportView] = useState("daily");
  const [batchFilter, setBatchFilter] = useState("All batches");
  const [studentFilter, setStudentFilter] = useState("All students");
  const [categoryFilter, setCategoryFilter] = useState("Overall");
  const [reports, setReports] = useState([]);
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
        if (!auth) return; // Cloud data needs a signed-in session; show local cache until then.
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
  }, [auth?.id]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  // Load stored daily reports for the dashboard (facilitators + program heads; students skip).
  useEffect(() => {
    if (!auth || role === "student") return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await loadReports();
        if (!cancelled && rows) setReports(rows);
      } catch (error) {
        console.error("[reports] Could not load report history.", error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [auth?.id, role]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Google sign-in via Supabase Auth. Supabase persists the session itself, so we no
  // longer keep our own auth copy in localStorage. We read the current session on load,
  // then keep `auth` in sync as the user signs in or out.
  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) {
      // Cloud sign-in isn't configured — the app still loads and shows a clear message.
      setAuthLoading(false);
      return;
    }
    let active = true;
    const handleSession = (session) => {
      if (!active) return;
      const user = session?.user;
      if (!user) {
        setAuth(null);
        setAuthLoading(false);
        return;
      }
      if (!isAllowedEmail(user.email)) {
        setAuthError(`Please sign in with your @${getAllowedDomain()} Google account.`);
        client.auth.signOut();
        setAuth(null);
        setAuthLoading(false);
        return;
      }
      setAuthError("");
      setAuth(authFromSupabaseUser(user));
      setAuthLoading(false);
    };
    client.auth.getSession().then(({ data }) => handleSession(data.session));
    const { data: sub } = client.auth.onAuthStateChange((_event, session) => handleSession(session));
    return () => {
      active = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if (!auth) return;
    setForm((current) => ({
      ...current,
      studentName: auth.role === "student" ? auth.name : current.studentName,
      facilitatorName: auth.role === "facilitator" ? auth.name : current.facilitatorName,
      schoolName: auth.schoolName || current.schoolName,
    }));
  }, [auth]);

  const baseEntries = useMemo(
    () =>
      role === "facilitator" || !auth?.name
        ? entries
        : entries.filter((entry) => entry.studentName?.toLowerCase() === auth.name.trim().toLowerCase()),
    [entries, role, auth?.name],
  );

  const batchOptions = useMemo(
    () => ["All batches", ...uniqueNonEmpty(baseEntries.map((entry) => entry.schoolName || "No batch"), 24)],
    [baseEntries],
  );

  const studentOptions = useMemo(
    () => ["All students", ...uniqueNonEmpty(baseEntries.map((entry) => entry.studentName || "Unnamed student"), 80)],
    [baseEntries],
  );

  const filteredEntries = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    let visibleEntries = baseEntries;
    if (role === "facilitator" && batchFilter !== "All batches") {
      visibleEntries = visibleEntries.filter((entry) => (entry.schoolName || "No batch") === batchFilter);
    }
    if (role === "facilitator" && studentFilter !== "All students") {
      visibleEntries = visibleEntries.filter((entry) => (entry.studentName || "Unnamed student") === studentFilter);
    }
    if (!lowered) return visibleEntries;
    return visibleEntries.filter((entry) =>
      [entry.studentName, entry.facilitatorName, entry.schoolName, entry.date, entry.theoryTopic, entry.practicalName].some((value) =>
        String(value || "").toLowerCase().includes(lowered),
      ),
    );
  }, [baseEntries, query, role, batchFilter, studentFilter]);

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
  const dashboardEntry = filteredEntries.length ? latestEntry : form;
  const milestones = useMemo(() => getMilestones(filteredEntries, dashboardEntry, streak), [filteredEntries, dashboardEntry, streak]);
  // Tree fullness reflects real progress: current score + logging streak.
  const treeProgress = Math.max(0.12, Math.min(1, 0.6 * (score / 100) + 0.4 * (Math.min(streak, 10) / 10)));
  const RoleIcon = isFacilitator ? Award : UserRound;
  const roleBadgeLabel = isFacilitator ? "Facilitator" : "Student";

  const signInWithGoogle = async () => {
    const client = getSupabaseClient();
    if (!client) {
      setAuthError("Google sign-in isn't set up yet. Ask your admin to finish the Supabase + Google setup.");
      return;
    }
    setAuthError("");
    const redirectTo = window.location.href.split("#")[0].split("?")[0];
    const { error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: { hd: getAllowedDomain(), prompt: "select_account" },
      },
    });
    if (error) {
      setAuthError(error.message || "Could not start Google sign-in. Please try again.");
    }
  };

  const logout = async () => {
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.auth.signOut();
      } catch (error) {
        console.error("[auth] Sign-out failed.", error);
      }
    }
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
      const cloudSave = await upsertCloudEntry(entry, auth?.email || role);
      if (cloudSave.skipped) {
        setStorageMode("local");
        setSavedMessage(isFacilitator ? "Feedback saved on this device." : "Saved on this device.");
      } else {
        setStorageMode("cloud");
        setSavedMessage(
          isFacilitator
            ? `Feedback saved for ${entry.studentName || "this student"}.`
            : "Saved successfully. Your facilitator can now see this.",
        );
        // Generate + email the daily report (student submit) or refresh the stored report
        // with facilitator feedback (facilitator save). Non-blocking.
        sendDailyReport(entry, role, isStudent ? auth?.email : undefined);
      }
      setSaveState("saved");
      setCelebrateKey((value) => value + 1);
      setCelebrate(true);
    } catch (error) {
      console.error("[persistence] Cloud save failed. Entry was kept in local browser backup.", error);
      setStorageMode("error");
      setSavedMessage("Saved on this device. Shared database unavailable.");
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

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f5] text-[#141413] dark:bg-[#181715] dark:text-[#faf9f5]">
        <div className="flex items-center gap-3 text-sm font-medium text-[#6c6a64] dark:text-[#a09d96]">
          <Loader size={18} className="animate-spin" />
          Checking your sign-in…
        </div>
      </main>
    );
  }

  if (!auth) {
    return <LoginScreen onSignIn={signInWithGoogle} error={authError} />;
  }

  return (
    <main className="min-h-screen bg-[#faf9f5] text-[#141413] transition-colors dark:bg-[#181715] dark:text-[#faf9f5]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-24 px-4 py-4 sm:px-6 lg:px-8">
        <header className="print-full relative overflow-hidden py-4">
          <div
            className="no-print pointer-events-none absolute inset-x-0 bottom-0 top-32 z-0 hidden opacity-40 dark:opacity-30 md:block"
            aria-hidden="true"
          >
            <GrowingTree progress={1} duration={4500} dark={dark} transparent seed={7} />
          </div>
          <div className="relative z-10">
          <nav className="no-print mb-16 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-[#e6dfd8] bg-[#faf9f5] py-3 dark:border-white/10 dark:bg-[#181715]">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <span className="text-xl leading-none text-[#cc785c]">✣</span>
              <span className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Student Progress</span>
              <span className="inline-flex h-9 items-center gap-2 rounded-full bg-[#efe9de] px-3 text-sm font-medium capitalize text-[#141413] dark:bg-[#252320] dark:text-[#faf9f5]">
                <RoleIcon size={16} className="text-[#cc785c]" />
                <span>{roleBadgeLabel}</span>
                <span className="hidden max-w-[12rem] truncate border-l border-[#e6dfd8] pl-2 text-[#6c6a64] dark:border-white/10 dark:text-[#a09d96] sm:inline">
                  {auth.name}
                </span>
              </span>
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
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Start a new day"
                title="New day"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-3 text-sm font-medium text-[#141413] transition active:scale-[0.98] dark:border-white/10 dark:bg-[#252320] dark:text-[#faf9f5] sm:px-4"
                onClick={resetToday}
              >
                <CalendarDays size={18} />
                <span className="hidden sm:inline">New day</span>
              </button>
              <IconButton icon={dark ? Sun : Moon} label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark((value) => !value)} />
              <button
                type="button"
                aria-label="Logout"
                className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-[#141413] transition active:scale-[0.98] dark:text-[#faf9f5] sm:px-4"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
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
          <div className="mx-auto flex max-w-[1400px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
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
              <ActionButton icon={Download} label="Export Report" onClick={exportPdf} />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_minmax(380px,420px)]">
          <div id="tracker" className="grid content-start gap-6 scroll-mt-24">
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

            <Card icon={Sparkles} title="Growth Garden" subtitle="Your tree grows as you log days and raise your scores.">
              <div className="relative h-72 overflow-hidden rounded-xl border border-[#e6dfd8] dark:border-white/10">
                <GrowingTree
                  progress={treeProgress}
                  duration={2400}
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
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5b8c5a]/10 px-3 py-1.5 text-sm font-medium text-[#5b8c5a] dark:bg-[#5b8c5a]/15">
                  <Check size={16} />
                  <span className="tabular-nums">{badges.filter((b) => b.earned).length} of {badges.length} earned</span>
                </span>
                {streak > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#cc785c]/10 px-3 py-1.5 text-sm font-medium text-[#cc785c] dark:bg-[#cc785c]/15">
                    <Flame size={16} className="animate-float" />
                    <span className="tabular-nums">{streak}-day streak</span>
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {badges.map((badge, i) => {
                  const BadgeIcon = badge.earned ? badge.icon : Lock;
                  return (
                    <div
                      key={badge.label}
                      title={badge.earned ? "Earned" : badge.hint}
                      className={
                        "animate-scale-in flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center " +
                        (badge.earned
                          ? "border-[#cc785c]/30 bg-[#cc785c]/10 dark:border-[#cc785c]/30 dark:bg-[#cc785c]/15"
                          : "border-dashed border-[#d8d0c6] bg-transparent opacity-70 dark:border-white/10")
                      }
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <span
                        className={
                          "grid h-10 w-10 place-items-center rounded-full " +
                          (badge.earned
                            ? "bg-[#faf9f5] text-[#cc785c] dark:bg-[#181715]"
                            : "bg-[#efe9de] text-[#a09d96] dark:bg-[#252320] dark:text-[#6c6a64]")
                        }
                      >
                        <BadgeIcon size={20} />
                      </span>
                      <span
                        className={
                          "text-[13px] font-medium leading-tight " +
                          (badge.earned
                            ? "text-[#141413] dark:text-[#faf9f5]"
                            : "text-[#6c6a64] dark:text-[#a09d96]")
                        }
                      >
                        {badge.label}
                      </span>
                      <span className="text-[11px] leading-tight text-[#a09d96] dark:text-[#6c6a64]">
                        {badge.earned ? "Earned" : badge.hint}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <aside className="grid content-start gap-6">
            <Card icon={BarChart3} title="Dashboard & Analytics" subtitle="Live summary from saved and current progress." dark>
              <div className="grid gap-3">
                <ProgressTile label="Overall progress" value={score} large dark index={0} />
                <div className="grid grid-cols-2 gap-3">
                  <ProgressTile label="Daily recorded" value={dailyScore} helper={`${filteredEntries.length ? latestEntry.date : "Today"}`} dark index={1} />
                  <ProgressTile label="Weekly average" value={weeklyScore} helper={`${weeklyEntries.length} day${weeklyEntries.length === 1 ? "" : "s"}`} dark index={2} />
                  <ProgressTile label="Monthly average" value={monthlyScore} helper={`${monthlyEntries.length} day${monthlyEntries.length === 1 ? "" : "s"}`} dark index={3} />
                  <ProgressTile label="Water intake" value={Math.round((waterToNumber(form.waterIntake) / 3) * 100)} helper={form.waterIntake} dark index={4} />
                  <ProgressTile label="English speaking" value={parsePercent(form.englishSpeaking)} dark index={5} />
                  <ProgressTile label="Theory completion" value={parsePercent(form.theoryCompletion)} dark index={6} />
                  <ProgressTile label="Practical completion" value={parsePercent(form.practicalCompletion)} dark index={7} />
                  <ProgressTile label="Emotional wellbeing" value={Number(form.emotionalRating) * 10} helper={`${form.emotionalRating}/10`} dark index={8} />
                  <ProgressTile label="AI confidence" value={Number(form.aiConfidence) * 10} helper={`${form.aiConfidence}/10`} dark index={9} />
                </div>
              </div>
            </Card>

            <Card icon={BarChart3} title="Weekly Progress Charts" subtitle="Saved entries show growth trends." dark>
              <div className="grid gap-x-4 sm:grid-cols-2">
                <MiniChart title="Overall" entries={weeklyEntries} getValue={getScore} dark />
                <MiniChart title="Water" entries={weeklyEntries} getValue={(entry) => Math.round((waterToNumber(entry.waterIntake) / 3) * 100)} dark />
                <MiniChart title="English" entries={weeklyEntries} getValue={(entry) => parsePercent(entry.englishSpeaking)} dark />
                <MiniChart title="Theory" entries={weeklyEntries} getValue={(entry) => parsePercent(entry.theoryCompletion)} dark />
                <MiniChart title="Practical" entries={weeklyEntries} getValue={(entry) => parsePercent(entry.practicalCompletion)} dark />
                <MiniChart title="Wellbeing" entries={weeklyEntries} getValue={(entry) => Number(entry.emotionalRating) * 10} dark />
                <MiniChart title="AI usage" entries={weeklyEntries} getValue={(entry) => aiChecks.filter((label) => entry.checks?.[label]).length * 12.5} dark />
              </div>
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

        <section id="analytics" className="grid gap-6 scroll-mt-24">
          <VisualReportsDashboard
            isFacilitator={isFacilitator}
            reportView={reportView}
            setReportView={setReportView}
            batchOptions={batchOptions}
            studentOptions={studentOptions}
            batchFilter={batchFilter}
            setBatchFilter={setBatchFilter}
            studentFilter={studentFilter}
            setStudentFilter={setStudentFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            entries={filteredEntries.length ? filteredEntries : [form]}
            weeklyEntries={weeklyEntries.length ? weeklyEntries : [form]}
            monthlyEntries={monthlyEntries.length ? monthlyEntries : [form]}
            currentEntry={dashboardEntry}
          />
          <MilestoneBoard milestones={milestones} />
          <FeedbackHistoryPanel entries={filteredEntries} isFacilitator={isFacilitator} />
          {isFacilitator && <ReportHistoryPanel reports={reports} query={query} />}
          {isFacilitator && (
            <FacilitatorComparisonPanel
              entries={filteredEntries}
              categoryFilter={categoryFilter}
              loadEntry={loadEntry}
            />
          )}
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
        duration={3600}
        dark={dark}
        fullscreen
        seed={replayKey + 3}
        replayKey={replayKey}
        onDone={() => setTimeout(close, 1200)}
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
    ? "print-full animate-rise card-lift scroll-mt-24 rounded-xl bg-[#181715] p-6 text-[#faf9f5] sm:p-8"
    : "print-full animate-rise card-lift scroll-mt-24 rounded-xl bg-[#efe9de] p-6 dark:bg-[#252320] sm:p-8";
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

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.79 2.72v2.26h2.9c1.7-1.57 2.65-3.88 2.65-6.63z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.41 5.41 0 0 1 3.66 9c0-.59.1-1.16.29-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03l2.99-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.59A9 9 0 0 0 .96 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}

function LoginScreen({ onSignIn, error }) {
  const [submitting, setSubmitting] = useState(false);

  const handleSignIn = async () => {
    setSubmitting(true);
    try {
      await onSignIn();
    } finally {
      // A successful sign-in redirects away from this page; if it didn't (an error), re-enable the button.
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f5] px-4 py-8 text-[#141413]">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1100px] items-center gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#efe9de] px-4 py-2 text-[13px] font-medium">
            <span className="text-[#cc785c]">✣</span>
            Secure organisation login
          </div>
          <h1 className="font-display text-5xl font-normal leading-[1.05] tracking-[-0.03em] sm:text-[64px]">
            Login to your progress tracker
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#3d3d3a]">
            Sign in with your NavGurukul Google account. Students fill their own daily progress; facilitators review every
            student's progress and add feedback.
          </p>
          <ul className="mt-6 space-y-2 text-[15px] leading-7 text-[#6c6a64]">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#cc785c]">✓</span>
              Only <span className="font-medium text-[#141413]">@navgurukul.org</span> accounts can sign in.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-[#cc785c]">✓</span>
              Your role (student or facilitator) is set automatically from your email.
            </li>
          </ul>
        </section>

        <div className="rounded-2xl bg-[#efe9de] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-normal tracking-[-0.02em]">Welcome</h2>
          <p className="mt-2 text-sm leading-6 text-[#6c6a64]">Use your organisation Google account to continue.</p>

          <button
            type="button"
            onClick={handleSignIn}
            disabled={submitting}
            className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-[#e6dfd8] bg-white px-5 text-sm font-medium text-[#141413] shadow-sm transition hover:bg-[#faf9f5] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GoogleGlyph />
            {submitting ? "Opening Google…" : "Continue with Google"}
          </button>

          {error && <p className="mt-4 rounded-lg bg-[#f7e3dd] px-4 py-3 text-sm font-medium text-[#c64545]">{error}</p>}

          <p className="mt-6 text-sm leading-6 text-[#6c6a64]">Your password stays with Google — this app never sees it.</p>
        </div>
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
              <Field label="School / Batch Name" value={form.schoolName} onChange={(value) => update("schoolName", value)} placeholder="School or batch" />
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
  const categoryScores = getCategoryScores(form);
  const sections = categoryMeta.map((category) => ({ label: category.label, value: categoryScores[category.key] }));
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
          <Field label="School / Batch Name" value={form.schoolName} onChange={(value) => update("schoolName", value)} placeholder="School or batch" />
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
          <Textarea label="Weekly feedback" value={form.weeklyFeedback} onChange={(value) => update("weeklyFeedback", value)} />
          <Textarea label="Monthly feedback" value={form.monthlyFeedback} onChange={(value) => update("monthlyFeedback", value)} />
          <Textarea label="Strengths highlighted" value={form.strengthHighlights} onChange={(value) => update("strengthHighlights", value)} />
          <Textarea label="Suggested improvements" value={form.suggestedImprovements} onChange={(value) => update("suggestedImprovements", value)} />
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
      <p className="font-display mt-1 break-words text-2xl font-normal leading-tight sm:text-3xl">{value}</p>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, primary = false }) {
  return (
    <button
      type="button"
      className={`inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg px-5 text-sm font-medium transition active:scale-95 ${
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

function IconButton({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[#e6dfd8] bg-[#faf9f5] text-[#141413] transition active:scale-95 dark:border-white/10 dark:bg-[#252320] dark:text-[#faf9f5]"
      onClick={onClick}
    >
      <Icon size={18} />
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

function TrendPill({ trend }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
      style={{ backgroundColor: `${trend.tone}22`, color: trend.tone }}
    >
      {trend.label}
    </span>
  );
}

function LineChart({ title, series, color = "#c96442", helper }) {
  const data = series.length ? series : [{ label: "No data", value: 0 }];
  const width = 640;
  const height = 220;
  const padX = 34;
  const padY = 28;
  const values = data.map((point) => clampScore(point.value));
  const max = Math.max(100, ...values);
  const xStep = data.length > 1 ? (width - padX * 2) / (data.length - 1) : 0;
  const points = data.map((point, index) => {
    const x = data.length > 1 ? padX + index * xStep : width / 2;
    const y = height - padY - (clampScore(point.value) / max) * (height - padY * 2);
    return { ...point, x, y, value: clampScore(point.value) };
  });
  const pointString = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaString =
    points.length > 1
      ? `${points[0].x},${height - padY} ${pointString} ${points[points.length - 1].x},${height - padY}`
      : "";

  return (
    <div className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">{title}</p>
        {helper && <p className="text-xs font-medium uppercase tracking-[1.5px] text-[#8e8b82]">{helper}</p>}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full overflow-visible" role="img" aria-label={title}>
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = height - padY - (tick / max) * (height - padY * 2);
          return (
            <g key={tick}>
              <line x1={padX} x2={width - padX} y1={y} y2={y} stroke="currentColor" className="text-[#e6dfd8] dark:text-white/10" />
              <text x={8} y={y + 4} fontSize="11" fill="#8e8b82">
                {tick}
              </text>
            </g>
          );
        })}
        {areaString && <polygon points={areaString} fill={color} opacity="0.1" />}
        {points.length > 1 && <polyline points={pointString} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
        {points.map((point, index) => (
          <g key={`${point.label}-${index}`}>
            <circle cx={point.x} cy={point.y} r="6" fill="#faf9f5" stroke={color} strokeWidth="3" />
            <text x={point.x} y={height - 6} textAnchor="middle" fontSize="11" fill="#8e8b82">
              {point.label}
            </text>
            <title>{`${point.label}: ${point.value}%`}</title>
          </g>
        ))}
      </svg>
    </div>
  );
}

function BarChart({ title, bars, helper }) {
  const data = bars.length ? bars : [{ label: "No data", value: 0, color: "#8e8b82" }];
  return (
    <div className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">{title}</p>
        {helper && <p className="text-xs font-medium uppercase tracking-[1.5px] text-[#8e8b82]">{helper}</p>}
      </div>
      <div className="grid gap-3">
        {data.map((bar) => {
          const value = clampScore(bar.value);
          return (
            <div key={bar.label}>
              <div className="mb-1 flex items-center justify-between gap-3 text-xs font-medium">
                <span className="text-[#3d3d3a] dark:text-[#faf9f5]">{bar.label}</span>
                <span className="font-mono tabular-nums" style={{ color: bar.color || progressColor(value) }}>
                  {value}%
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-[#e6dfd8] dark:bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${value}%`, backgroundColor: bar.color || progressColor(value) }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-medium uppercase tracking-[1.5px] text-[#8e8b82]">{label}</span>
      <select
        className="h-10 rounded-lg border border-[#e6dfd8] bg-[#faf9f5] px-3 text-sm text-[#141413] outline-none transition focus:border-[#cc785c] focus:ring-4 focus:ring-[#cc785c]/15 dark:border-white/10 dark:bg-[#181715] dark:text-[#faf9f5]"
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

function CategoryScoreGrid({ entry, entries }) {
  const scores = getCategoryScores(entry);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categoryMeta.map((category) => {
        const value = scores[category.key] || 0;
        const trend = trendForEntries(entries, category.key);
        return (
          <div key={category.key} className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">{category.label}</p>
                <p className="mt-1 text-xs text-[#8e8b82]">{getCompletionStatus(value)}</p>
              </div>
              <TrendPill trend={trend} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <RadialProgress value={value} size={96} stroke={10} track="rgba(142,139,130,0.18)" />
              <div className="min-w-0 flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-[#e6dfd8] dark:bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: category.color }} />
                </div>
                <p className="mt-3 text-xs leading-5 text-[#6c6a64] dark:text-[#a09d96]">
                  Status is based on completion, confidence, ratings, and related checklist work.
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ReportTabs({ value, onChange }) {
  const views = [
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
  ];
  return (
    <div className="grid gap-2 rounded-xl bg-[#f5f0e8] p-2 dark:bg-[#1f1e1b] sm:grid-cols-3">
      {views.map((view) => (
        <button
          key={view.key}
          className={`h-10 rounded-lg text-sm font-medium transition ${
            value === view.key ? "bg-[#cc785c] text-white" : "text-[#6c6a64] hover:text-[#141413] dark:text-[#a09d96] dark:hover:text-[#faf9f5]"
          }`}
          onClick={() => onChange(view.key)}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}

function DailyReport({ currentEntry, entries, focusedCategoryKey, focusedCategoryLabel }) {
  const categoryBars = categoryMeta.map((category) => ({
    label: category.shortLabel,
    value: getCategoryScores(currentEntry)[category.key],
    color: category.color,
  }));
  const tasks = getCompletedTasks(currentEntry);
  const notes = uniqueNonEmpty([
    currentEntry.proudToday,
    currentEntry.practicalLearned,
    currentEntry.challengeFaced,
    currentEntry.improveTomorrow,
    currentEntry.askedForHelp,
  ], 5);
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <LineChart
        title={`${focusedCategoryLabel} daily trend`}
        series={chartSeries(entries.slice(0, 7), focusedCategoryKey, currentEntry)}
        color={focusedCategoryKey === "overall" ? "#cc785c" : categoryMeta.find((category) => category.key === focusedCategoryKey)?.color}
        helper="recent records"
      />
      <div className="grid gap-4">
        <BarChart title="Category score today" bars={categoryBars} helper={currentEntry.date || "Today"} />
        <div className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
          <div className="mb-3 grid gap-2 sm:grid-cols-3">
            <Metric label="Score" value={`${getScore(currentEntry)}%`} tone="coral" />
            <Metric label="Attendance" value={currentEntry.attendance || "-"} tone="ink" />
            <Metric label="Status" value={currentEntry.dailyStatus || "-"} tone="ink" />
          </div>
          <p className="mb-2 text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Tasks completed today</p>
          <div className="flex flex-wrap gap-2">
            {(tasks.length ? tasks : ["No completed tasks recorded yet"]).map((task) => (
              <span key={task} className="rounded-full bg-[#faf9f5] px-3 py-1.5 text-xs font-medium text-[#3d3d3a] dark:bg-[#252320] dark:text-[#faf9f5]">
                {task}
              </span>
            ))}
          </div>
          <p className="mb-2 mt-4 text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Daily reflections</p>
          <div className="grid gap-2">
            {(notes.length ? notes : ["No reflections saved for this day yet"]).map((note) => (
              <p key={note} className="rounded-lg bg-[#faf9f5] p-3 text-sm leading-6 text-[#6c6a64] dark:bg-[#252320] dark:text-[#a09d96]">
                {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WeeklyReport({ entries, focusedCategoryKey, focusedCategoryLabel }) {
  const source = entries.length ? entries : [];
  const categoryBars = categoryMeta.map((category) => ({
    label: category.shortLabel,
    value: averageScores(source.map((entry) => getCategoryScores(entry)[category.key])),
    color: category.color,
  }));
  const attendanceRate = clampScore((source.filter((entry) => entry.attendance === "Present").length / Math.max(1, source.length)) * 100);
  const skills = getSkillsLearned(source);
  const improvements = uniqueNonEmpty(source.map((entry) => entry.improvementAreas || entry.practicalNeedsImprovement || entry.challengeFaced), 6);
  const feedback = uniqueNonEmpty(source.map((entry) => entry.weeklyFeedback || entry.additionalComments || entry.practicalDoneWell), 5);
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <LineChart
        title={`${focusedCategoryLabel} weekly growth`}
        series={chartSeries(source, focusedCategoryKey)}
        color={focusedCategoryKey === "overall" ? "#cc785c" : categoryMeta.find((category) => category.key === focusedCategoryKey)?.color}
        helper={`${source.length} record${source.length === 1 ? "" : "s"}`}
      />
      <div className="grid gap-4">
        <BarChart title="Weekly category averages" bars={categoryBars} helper="category split" />
        <div className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <ProgressTile label="Weekly attendance" value={attendanceRate} helper={`${source.filter((entry) => entry.attendance === "Present").length}/${source.length || 0} present`} />
            <ProgressTile label="Weekly performance" value={averageScore(source)} helper={getCompletionStatus(averageScore(source))} />
          </div>
          <p className="mb-2 text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Skills learned</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {(skills.length ? skills : ["No skills recorded this week"]).map((skill) => (
              <span key={skill} className="rounded-full bg-[#faf9f5] px-3 py-1.5 text-xs font-medium text-[#3d3d3a] dark:bg-[#252320] dark:text-[#faf9f5]">
                {skill}
              </span>
            ))}
          </div>
          <p className="mb-2 text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Weekly feedback</p>
          <div className="grid gap-2">
            {(feedback.length ? feedback : ["No facilitator feedback recorded this week"]).map((item) => (
              <p key={item} className="rounded-lg bg-[#faf9f5] p-3 text-sm leading-6 text-[#6c6a64] dark:bg-[#252320] dark:text-[#a09d96]">
                {item}
              </p>
            ))}
          </div>
          <p className="mb-2 mt-4 text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Areas of improvement</p>
          <div className="flex flex-wrap gap-2">
            {(improvements.length ? improvements : ["No improvement areas recorded"]).map((item) => (
              <span key={item} className="rounded-full bg-[#cc785c]/10 px-3 py-1.5 text-xs font-medium text-[#a9583e] dark:text-[#e08968]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthlyReport({ entries, focusedCategoryKey, focusedCategoryLabel }) {
  const summaries = getMonthlySummaries(entries);
  const latest = summaries[summaries.length - 1];
  const monthlyBars = summaries.map((summary) => ({
    label: summary.label,
    value: focusedCategoryKey === "overall" ? summary.overall : summary.categories[focusedCategoryKey],
    color: focusedCategoryKey === "overall" ? "#cc785c" : categoryMeta.find((category) => category.key === focusedCategoryKey)?.color,
  }));
  const masteryBars = categoryMeta.map((category) => ({
    label: category.shortLabel,
    value: latest?.categories?.[category.key] || 0,
    color: category.color,
  }));
  const achievements = uniqueNonEmpty(entries.map((entry) => entry.proudToday || entry.practicalDoneWell || entry.strengthHighlights), 5);
  const skills = getSkillsLearned(entries);
  const growthTrend = trendFromValues(summaries.map((summary) => (focusedCategoryKey === "overall" ? summary.overall : summary.categories[focusedCategoryKey])));
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="grid gap-4">
        <BarChart title={`${focusedCategoryLabel} month-wise comparison`} bars={monthlyBars} helper="last 6 months" />
        <LineChart
          title="Overall performance trend"
          series={summaries.map((summary) => ({ id: summary.id, label: summary.label, value: summary.performance }))}
          color="#5d8db8"
          helper="performance score"
        />
      </div>
      <div className="grid gap-4">
        <BarChart title="Skill mastery report" bars={masteryBars} helper={latest?.label || "No month"} />
        <div className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Overall growth summary</p>
            <TrendPill trend={growthTrend} />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <ProgressTile label="Monthly progress" value={latest?.overall || 0} helper={getCompletionStatus(latest?.overall || 0)} />
            <ProgressTile label="Monthly attendance" value={latest?.attendance || 0} />
            <ProgressTile label="Performance score" value={latest?.performance || 0} />
          </div>
          <p className="mb-2 mt-4 text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Achievement highlights</p>
          <div className="grid gap-2">
            {(achievements.length ? achievements : ["No achievement highlights recorded this month"]).map((item) => (
              <p key={item} className="rounded-lg bg-[#faf9f5] p-3 text-sm leading-6 text-[#6c6a64] dark:bg-[#252320] dark:text-[#a09d96]">
                {item}
              </p>
            ))}
          </div>
          <p className="mb-2 mt-4 text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Skills practiced</p>
          <div className="flex flex-wrap gap-2">
            {(skills.length ? skills : ["No skills recorded yet"]).map((skill) => (
              <span key={skill} className="rounded-full bg-[#faf9f5] px-3 py-1.5 text-xs font-medium text-[#3d3d3a] dark:bg-[#252320] dark:text-[#faf9f5]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualReportsDashboard({
  isFacilitator,
  reportView,
  setReportView,
  batchOptions,
  studentOptions,
  batchFilter,
  setBatchFilter,
  studentFilter,
  setStudentFilter,
  categoryFilter,
  setCategoryFilter,
  entries,
  weeklyEntries,
  monthlyEntries,
  currentEntry,
}) {
  const focusedCategoryKey = getCategoryKeyFromLabel(categoryFilter);
  const focusedCategoryLabel = categoryFilter;
  const reportEntries = reportView === "daily" ? entries : reportView === "weekly" ? weeklyEntries : monthlyEntries;
  const overallProgress = getOverallProgress(currentEntry);
  const performanceScore = getScore(currentEntry);
  return (
    <Card icon={BarChart3} title="Visual Progress Reports" subtitle="Daily, weekly, and monthly analytics with category trends and completion status.">
      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-4">
          <ReportTabs value={reportView} onChange={setReportView} />
          <div className="grid gap-3 rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b] md:grid-cols-3">
            {isFacilitator && <FilterSelect label="Batch" value={batchFilter} options={batchOptions} onChange={setBatchFilter} />}
            {isFacilitator && <FilterSelect label="Student" value={studentFilter} options={studentOptions} onChange={setStudentFilter} />}
            <FilterSelect label="Category" value={categoryFilter} options={categoryOptions} onChange={setCategoryFilter} />
          </div>
        </div>
        <div className="grid gap-3 rounded-xl bg-[#181715] p-4 text-[#faf9f5] sm:grid-cols-3 lg:grid-cols-1">
          <Metric label="Overall progress" value={`${overallProgress}%`} tone="coral" />
          <Metric label="Performance score" value={`${performanceScore}%`} tone="ink" />
          <Metric label="Completion status" value={getCompletionStatus(overallProgress)} tone="ink" />
        </div>
      </div>

      <div className="mt-5">
        <CategoryScoreGrid entry={currentEntry} entries={entries} />
      </div>

      <div className="mt-5">
        {reportView === "daily" && (
          <DailyReport currentEntry={currentEntry} entries={entries} focusedCategoryKey={focusedCategoryKey} focusedCategoryLabel={focusedCategoryLabel} />
        )}
        {reportView === "weekly" && (
          <WeeklyReport entries={reportEntries} focusedCategoryKey={focusedCategoryKey} focusedCategoryLabel={focusedCategoryLabel} />
        )}
        {reportView === "monthly" && (
          <MonthlyReport entries={reportEntries} focusedCategoryKey={focusedCategoryKey} focusedCategoryLabel={focusedCategoryLabel} />
        )}
      </div>
    </Card>
  );
}

function MilestoneBoard({ milestones }) {
  return (
    <Card icon={Award} title="Milestones & Achievements" subtitle="Completed wins and upcoming goals from the latest progress data.">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
          <p className="mb-3 text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Completed milestones</p>
          <div className="grid gap-3">
            {(milestones.completed.length ? milestones.completed : [{ title: "Start tracking", detail: "Save the first progress entry" }]).map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-lg bg-[#faf9f5] p-3 dark:bg-[#252320]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${item.color || "#5b8c5a"}22`, color: item.color || "#5b8c5a" }}>
                  <Check size={17} />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">{item.title}</p>
                  <p className="text-xs text-[#6c6a64] dark:text-[#a09d96]">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
          <p className="mb-3 text-sm font-medium text-[#141413] dark:text-[#faf9f5]">Upcoming milestones</p>
          <div className="grid gap-3">
            {milestones.upcoming.map((item) => (
              <div key={item.title} className="rounded-lg bg-[#faf9f5] p-3 dark:bg-[#252320]">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">{item.title}</p>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color || "#d9a441" }} />
                </div>
                <p className="text-xs text-[#6c6a64] dark:text-[#a09d96]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function FeedbackHistoryPanel({ entries, isFacilitator }) {
  const feedback = getFeedbackEntries(entries);
  return (
    <Card
      icon={HeartHandshake}
      title="Feedback History"
      subtitle={isFacilitator ? "Weekly, monthly, and daily feedback separated from progress reports." : "Facilitator feedback saved for your progress records."}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {(feedback.length ? feedback : []).map((entry) => (
          <article key={entry.id || `${entry.studentName}-${entry.date}`} className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-[#141413] dark:text-[#faf9f5]">{entry.studentName || "Unnamed student"}</p>
                <p className="text-sm text-[#6c6a64] dark:text-[#a09d96]">{entry.date} - {entry.facilitatorName || "Facilitator"}</p>
              </div>
              <span className="rounded-full bg-[#cc785c] px-3 py-1 text-sm font-medium text-white">{entry.facilitatorRating}/10</span>
            </div>
            <div className="grid gap-2">
              <ReadField label="Weekly feedback" value={entry.weeklyFeedback} />
              <ReadField label="Monthly feedback" value={entry.monthlyFeedback} />
              <ReadField label="Strengths" value={entry.strengthHighlights || entry.practicalDoneWell} />
              <ReadField label="Suggested improvements" value={entry.suggestedImprovements || entry.practicalNeedsImprovement || entry.improvementAreas} />
              <ReadField label="Additional comments" value={entry.additionalComments} />
            </div>
          </article>
        ))}
        {!feedback.length && (
          <div className="rounded-xl bg-[#f5f0e8] p-4 text-sm leading-6 text-[#6c6a64] dark:bg-[#1f1e1b] dark:text-[#a09d96]">
            No facilitator feedback has been saved yet.
          </div>
        )}
      </div>
    </Card>
  );
}

function ReportSummaryList({ label, items, color }) {
  if (!items || !items.length) return null;
  return (
    <div className="mt-2">
      <p className="text-xs font-medium uppercase tracking-wide" style={{ color }}>{label}</p>
      <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-[#3d3d3a] dark:text-[#a09d96]">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ReportHistoryPanel({ reports, query }) {
  const lowered = (query || "").trim().toLowerCase();
  const visible = (reports || []).filter(
    (report) => !lowered || String(report.student_name || "").toLowerCase().includes(lowered),
  );
  const statusStyles = {
    sent: "bg-[#5b8c5a] text-white",
    failed: "bg-[#c64545] text-white",
    pending: "bg-[#d9a441] text-white",
    skipped: "bg-[#efe9de] text-[#6c6a64] dark:bg-[#252320] dark:text-[#a09d96]",
  };
  return (
    <Card
      icon={BarChart3}
      title="Report History"
      subtitle="AI performance summaries emailed to Program Heads. Newest first."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {visible.map((report) => {
          const cats = report.category_scores || {};
          const summary = report.ai_summary || {};
          return (
            <article key={report.id || report.entry_id} className="rounded-xl bg-[#f5f0e8] p-4 dark:bg-[#1f1e1b]">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-[#141413] dark:text-[#faf9f5]">{report.student_name || "Unnamed student"}</p>
                  <p className="text-sm text-[#6c6a64] dark:text-[#a09d96]">
                    {report.report_date}
                    {report.school_name ? ` · ${report.school_name}` : ""}
                  </p>
                </div>
                <span className="rounded-full bg-[#181715] px-3 py-1 text-sm font-medium text-[#faf9f5]">{report.overall_score}%</span>
              </div>

              <div className="mb-1 grid gap-2 sm:grid-cols-2">
                <SectionBar label="Practical" value={cats.practicals || 0} />
                <SectionBar label="English" value={cats.english || 0} />
                <SectionBar label="Theory" value={cats.theory || 0} />
                <SectionBar label="Wellness" value={cats.wellness || 0} />
              </div>

              <ReportSummaryList label="Key achievements" items={summary.achievements} color="#5b8c5a" />
              <ReportSummaryList label="Areas needing support" items={summary.areas_needing_support} color="#c96442" />
              <ReportSummaryList label="Next steps" items={summary.next_steps} color="#5d8db8" />

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className={`rounded-full px-2.5 py-1 font-medium ${statusStyles[report.email_status] || statusStyles.skipped}`}>
                  Email: {report.email_status || "—"}
                </span>
                <span className="rounded-full bg-[#efe9de] px-2.5 py-1 font-medium text-[#6c6a64] dark:bg-[#252320] dark:text-[#a09d96]">
                  {report.facilitator_complete ? "Facilitator reviewed" : "Awaiting facilitator"}
                </span>
              </div>
            </article>
          );
        })}
        {!visible.length && (
          <div className="rounded-xl bg-[#f5f0e8] p-4 text-sm leading-6 text-[#6c6a64] dark:bg-[#1f1e1b] dark:text-[#a09d96]">
            No reports yet. Reports appear here automatically when students submit their daily tracker.
          </div>
        )}
      </div>
    </Card>
  );
}

function FacilitatorComparisonPanel({ entries, categoryFilter, loadEntry }) {
  const focusedCategoryKey = getCategoryKeyFromLabel(categoryFilter);
  const summaries = getStudentSummaries(entries);
  const bars = summaries.slice(0, 8).map((student) => ({
    label: student.name,
    value: focusedCategoryKey === "overall" ? student.overall : student.categories[focusedCategoryKey],
    color: focusedCategoryKey === "overall" ? "#cc785c" : categoryMeta.find((category) => category.key === focusedCategoryKey)?.color,
  }));
  return (
    <Card icon={UserRound} title="Facilitator Student Comparison" subtitle="Compare students by selected category, attendance, and latest milestone progress.">
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <BarChart title={`${categoryFilter} comparison`} bars={bars} helper={`${summaries.length} student${summaries.length === 1 ? "" : "s"}`} />
        <div className="grid gap-3">
          {summaries.slice(0, 6).map((student) => (
            <button
              key={student.name}
              className="rounded-xl bg-[#f5f0e8] p-4 text-left transition hover:shadow-lift dark:bg-[#1f1e1b]"
              onClick={() => student.latest && loadEntry(student.latest)}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-[#141413] dark:text-[#faf9f5]">{student.name}</p>
                  <p className="text-sm text-[#6c6a64] dark:text-[#a09d96]">{student.batch} - {student.records} records</p>
                </div>
                <span className="rounded-full bg-[#181715] px-3 py-1 text-sm font-medium text-[#faf9f5]">{student.overall}%</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <SectionBar label="Performance" value={student.performance} />
                <SectionBar label="Attendance" value={student.attendance} />
              </div>
            </button>
          ))}
          {!summaries.length && (
            <p className="rounded-xl bg-[#f5f0e8] p-4 text-sm text-[#6c6a64] dark:bg-[#1f1e1b] dark:text-[#a09d96]">
              No student records match the current filters.
            </p>
          )}
        </div>
      </div>
    </Card>
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
  // Every possible badge, always returned, with whether it's earned yet and a
  // short hint of how to unlock it. The card shows earned ones highlighted and
  // not-yet-earned ones faded, so it always feels full and gives a goal to aim for.
  return [
    { label: "3-day streak", icon: Flame, earned: streak >= 3, hint: "Log 3 days in a row" },
    { label: "Present today", icon: CalendarDays, earned: form.attendance === "Present", hint: "Mark attendance present" },
    { label: "English effort", icon: Sparkles, earned: parsePercent(form.englishSpeaking) >= 60, hint: "Reach 60% English speaking" },
    { label: "Wellbeing win", icon: HeartHandshake, earned: Number(form.emotionalRating) >= 7, hint: "Rate wellbeing 7 or higher" },
    { label: "AI explorer", icon: Award, earned: Number(form.aiConfidence) >= 7, hint: "Rate AI confidence 7 or higher" },
    { label: "Practical progress", icon: CheckCircle, earned: parsePercent(form.practicalCompletion) >= 75, hint: "Reach 75% practical completion" },
  ];
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
