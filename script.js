// 掲載する自社サービス・事業。差し替えるときはこの配列を編集してください。
const works = [
  {
    title: "AI導入支援",
    year: "CODEVISION",
    icon: "🧭",
    bg: "linear-gradient(135deg,#1f3a2c,#3d5a2a)",
    summary: "何から始めるか迷ったら。AI活用診断から実装まで",
    body: "沖縄の中小企業向けに、AIで業務を回すところまで伴走するサービス。3分でできる無料AI診断や、個社の課題を整理するAI活用診断を入口に、顧問・開発・研修まで一緒に進めます。",
    tags: ["AI活用診断", "AI顧問", "研修"],
    url: "https://codevision.co.jp",
  },
  {
    title: "AI業務代行",
    year: "CODEVISION",
    icon: "⚙️",
    bg: "linear-gradient(135deg,#132f3a,#1f4f4a)",
    summary: "経理・顧客対応・マーケティング運用を、AIと人のチームに",
    body: "経理・顧客対応・マーケティング運用を、AIと人のチームにまるごと任せられるサービス。ツールを渡すだけでなく、成果が出る運用まで引き受けます。",
    tags: ["業務代行", "バックオフィス", "AI運用"],
    url: "https://codevision.co.jp",
  },
  {
    title: "AI教室 MOAI",
    year: "CODEVISION",
    icon: "🎓",
    bg: "linear-gradient(135deg,#2a1f3a,#3d2a5a)",
    summary: "沖縄の生成AIスクール。勉強会から、仕事に活かすAIの学びへ",
    body: "沖縄で生成AIを学べるスクール・コミュニティ。無料の勉強会から、仕事で使えるレベルまで仲間と一緒に学べます。このポートフォリオもMOAIの取り組みの一つです。",
    tags: ["生成AI", "スクール", "コミュニティ"],
    url: "https://moai.okinawa",
  },
  {
    title: "ドローン赤外線外壁点検",
    year: "沖縄ドローン",
    icon: "🛰️",
    bg: "linear-gradient(135deg,#3a2a13,#5a3f1f)",
    summary: "足場なしで、建物の外壁を赤外線カメラで調査",
    body: "ドローンに搭載した赤外線カメラで、建物外壁の浮きや劣化を調べるサービス。建築基準法の定期報告で認められた手法で、足場を組まずに短期間で調査できます。",
    tags: ["ドローン", "赤外線", "外壁調査"],
  },
  {
    title: "WHOOPS！ドローンスクール沖縄北部校",
    year: "沖縄ドローン",
    icon: "🚁",
    bg: "linear-gradient(135deg,#0f2f3f,#145a6a)",
    summary: "国家資格（二等無人航空機操縦士）の登録講習機関",
    body: "国の登録講習機関として、二等無人航空機操縦士（マルチローター・基本）の国家資格講習を行うドローンスクール。沖縄北部でドローンの操縦を学べます。",
    tags: ["国家資格", "二等", "スクール"],
  },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Loader: F-15の影が左→右へ通過 ---------- */
(function loader() {
  const el = document.getElementById("loader");
  const finish = () => {
    document.body.classList.remove("is-loading");
    el.classList.add("done");
    setTimeout(() => el.remove(), 700);
  };
  let seen = false;
  try { seen = sessionStorage.getItem("hotaru-loader") === "1"; } catch (e) {}
  if (reduceMotion || seen) {
    el.remove();
    document.body.classList.remove("is-loading");
    return;
  }
  try { sessionStorage.setItem("hotaru-loader", "1"); } catch (e) {}
  el.classList.add("play");
  el.addEventListener("click", finish, { once: true });
  setTimeout(finish, 2300);
})();

/* ---------- Works ---------- */
const list = document.getElementById("works-list");
const dialog = document.getElementById("work-dialog");

works.forEach((work, i) => {
  const button = document.createElement("button");
  button.className = "work reveal";
  button.type = "button";
  button.style.transitionDelay = `${(i % 3) * 0.08}s`;
  button.innerHTML = `
    <div class="work-thumb" aria-hidden="true"><span></span></div>
    <div class="work-body">
      <span class="work-meta"></span>
      <h3></h3>
      <p></p>
    </div>`;
  button.querySelector(".work-thumb").style.background = work.bg;
  button.querySelector(".work-thumb span").textContent = work.icon;
  button.querySelector(".work-meta").textContent = `MISSION ${String(i + 1).padStart(2, "0")} / ${work.year}`;
  button.querySelector("h3").textContent = work.title;
  button.querySelector("p").textContent = work.summary;
  button.addEventListener("click", () => openWork(work, i));
  if (!reduceMotion) addTilt(button);
  list.appendChild(button);
});

function openWork(work, i) {
  const thumb = document.getElementById("dialog-thumb");
  thumb.style.background = work.bg;
  thumb.textContent = work.icon;
  document.getElementById("dialog-meta").textContent = `MISSION ${String(i + 1).padStart(2, "0")} / ${work.year}`;
  document.getElementById("dialog-title").textContent = work.title;
  document.getElementById("dialog-body").textContent = work.body;
  document.getElementById("dialog-tags").replaceChildren(
    ...work.tags.map((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      return li;
    })
  );
  const link = document.getElementById("dialog-link");
  if (work.url) {
    link.href = work.url;
    link.hidden = false;
  } else {
    link.hidden = true;
  }
  dialog.showModal();
}

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

function addTilt(el) {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  el.addEventListener("pointerleave", () => {
    el.style.transform = "";
  });
}

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Header & mobile menu ---------- */
const header = document.getElementById("header");
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "CLOSE" : "MENU";
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "MENU";
  })
);

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- HUD: scroll speed → Mach ---------- */
const hudMach = document.getElementById("hud-mach");
const hudAlt = document.getElementById("hud-alt");
const hudProgress = document.getElementById("hud-progress");
let lastY = window.scrollY;
let lastT = performance.now();
let speed = 0; // px/ms (smoothed)

function onScroll() {
  const now = performance.now();
  const dy = Math.abs(window.scrollY - lastY);
  const dt = Math.max(1, now - lastT);
  speed = speed * 0.7 + (dy / dt) * 0.3;
  lastY = window.scrollY;
  lastT = now;
  header.classList.toggle("scrolled", window.scrollY > 40);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? window.scrollY / max : 0;
  hudProgress.style.width = `${p * 100}%`;
  hudAlt.textContent = String(Math.round(p * 45000)).padStart(5, "0");
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Cursor glow ---------- */
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

/* ---------- Sky: fireflies + speed streaks ---------- */
const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");
let flies = [];
let streaks = [];
let W = 0;
let H = 0;

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = W * devicePixelRatio;
  canvas.height = H * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  const count = Math.round(Math.min(60, W / 22));
  flies = Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: 0.8 + Math.random() * 2.2,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    phase: Math.random() * Math.PI * 2,
  }));
}

function spawnStreak(intensity) {
  streaks.push({
    x: W + 50,
    y: Math.random() * H,
    len: 80 + Math.random() * 220 * intensity,
    v: 18 + Math.random() * 30 * intensity,
    a: 0.3 + 0.5 * Math.min(1, intensity),
  });
}

function draw(t) {
  ctx.clearRect(0, 0, W, H);
  speed *= 0.95;
  const mach = Math.min(3, speed * 0.9);
  hudMach.textContent = `M ${mach.toFixed(2)}`;

  // speed streaks when scrolling fast
  if (mach > 0.4 && Math.random() < mach * 0.5) spawnStreak(mach);
  streaks = streaks.filter((s) => s.x + s.len > -50);
  for (const s of streaks) {
    s.x -= s.v;
    const g = ctx.createLinearGradient(s.x, s.y, s.x + s.len, s.y);
    g.addColorStop(0, `rgba(125, 249, 255, ${s.a})`);
    g.addColorStop(1, "rgba(125, 249, 255, 0)");
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.len, s.y);
    ctx.stroke();
  }

  // fireflies (drift left faster with speed)
  for (const f of flies) {
    f.x += f.vx + Math.sin(t / 2000 + f.phase) * 0.15 - mach * 2.5;
    f.y += f.vy + Math.cos(t / 2500 + f.phase) * 0.15;
    if (f.x < -20) f.x = W + 20;
    if (f.x > W + 20) f.x = -20;
    if (f.y < -20) f.y = H + 20;
    if (f.y > H + 20) f.y = -20;
    const alpha = 0.2 + 0.8 * Math.max(0, Math.sin(t / 900 + f.phase));
    const rad = f.r * 8;
    const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, rad);
    g.addColorStop(0, `rgba(228, 255, 92, ${alpha})`);
    g.addColorStop(1, "rgba(228, 255, 92, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(f.x, f.y, rad, 0, Math.PI * 2);
    ctx.fill();
    if (mach > 0.3) {
      ctx.strokeStyle = `rgba(228, 255, 92, ${alpha * 0.4})`;
      ctx.lineWidth = f.r;
      ctx.beginPath();
      ctx.moveTo(f.x, f.y);
      ctx.lineTo(f.x + mach * 25, f.y);
      ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
}

if (!reduceMotion) {
  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

/* ---------- Hero flight: responsive path with tangent-aligned heading ---------- */
const heroFlight = document.getElementById("hero-flight");
if (heroFlight && CSS.supports("offset-path", 'path("M0 0 L1 1")')) {
  const updateFlightPath = () => {
    const route = heroFlight.querySelector(".aircraft-route");
    const width = heroFlight.clientWidth;
    const height = heroFlight.clientHeight;
    // Reserve room for the rotated image at every edge of the flight area.
    const inset = route.offsetWidth * Math.SQRT2 / 2 + 8;
    const x = (value) => inset + (width - inset * 2) * value;
    const y = (value) => inset + (height - inset * 2) * value;
    const point = (px, py) => `${x(px).toFixed(2)} ${y(py).toFixed(2)}`;
    const path = `M ${point(.12, .65)} C ${point(.25, .18)}, ${point(.55, .02)}, ${point(.76, .2)} C ${point(1, .35)}, ${point(.96, .72)}, ${point(.72, .85)} C ${point(.48, 1)}, ${point(.08, .92)}, ${point(.05, .8)} C ${point(.02, .74)}, ${point(.107, .697)}, ${point(.12, .65)} Z`;
    heroFlight.style.setProperty("--flight-path", `path("${path}")`);
    heroFlight.classList.add("has-flight-path");
  };
  updateFlightPath();
  new ResizeObserver(updateFlightPath).observe(heroFlight);
}
