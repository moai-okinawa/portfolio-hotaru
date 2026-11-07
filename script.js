// 制作物（サンプル）。差し替えるときはこの配列を編集してください。
const works = [
  {
    title: "カフェのLPサイト",
    year: "2026",
    icon: "☕",
    bg: "linear-gradient(135deg,#1f3a2c,#3d5a2a)",
    summary: "地域のカフェ向け1枚ものサイト（サンプル）",
    body: "メニュー・営業時間・地図をスマホで見やすくまとめたランディングページ。AIで文章のたたき台を作り、店主さんの言葉に寄せて仕上げる流れを想定しています。",
    tags: ["HTML", "CSS", "AIライティング"],
  },
  {
    title: "予約管理の自動化",
    year: "2026",
    icon: "📅",
    bg: "linear-gradient(135deg,#132f3a,#1f4f4a)",
    summary: "フォーム→スプレッドシート→通知の仕組み（サンプル）",
    body: "問い合わせフォームの内容をスプレッドシートに自動で記録し、担当者に通知する仕組み。手作業の転記をなくすことを目指しました。",
    tags: ["Googleフォーム", "GAS", "自動化"],
  },
  {
    title: "AIプロンプト集",
    year: "2026",
    icon: "💡",
    bg: "linear-gradient(135deg,#3a3413,#4f4a1f)",
    summary: "日々の業務で使えるプロンプトのまとめ（サンプル）",
    body: "メール返信、議事録要約、SNS投稿案づくりなど、よく使う場面ごとにプロンプトを整理した資料。初めてAIを使う人でも真似できる形にしています。",
    tags: ["ChatGPT", "Claude", "資料作成"],
  },
  {
    title: "AI講座のスライド",
    year: "2026",
    icon: "🎓",
    bg: "linear-gradient(135deg,#2a1f3a,#3d2a5a)",
    summary: "初心者向けAI活用講座の教材（サンプル）",
    body: "AIにはじめて触れる人向けの講座スライド。専門用語を使わず、明日から使える例を中心に組み立てています。",
    tags: ["講座", "スライド", "AI入門"],
  },
  {
    title: "LINE自動応答",
    year: "2026",
    icon: "💬",
    bg: "linear-gradient(135deg,#123a22,#1f5a33)",
    summary: "よくある質問に自動で答える仕組み（サンプル）",
    body: "営業時間や予約方法など、よくある問い合わせにLINEで自動返信。スタッフが本当に必要な対応に集中できるようにします。",
    tags: ["LINE", "自動化", "接客"],
  },
  {
    title: "沖縄観光マップ",
    year: "2026",
    icon: "🗺️",
    bg: "linear-gradient(135deg,#0f2f3f,#145a6a)",
    summary: "おすすめスポットをまとめた地図ページ（サンプル）",
    body: "地元目線のおすすめスポットを地図にまとめたWebページ。スマホで現在地から近い場所を探しやすくしています。",
    tags: ["地図", "JavaScript", "観光"],
  },
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  button.querySelector(".work-meta").textContent = `FLIGHT ${String(i + 1).padStart(2, "0")} / ${work.year}`;
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
  document.getElementById("dialog-meta").textContent = `FLIGHT ${String(i + 1).padStart(2, "0")} / ${work.year}`;
  document.getElementById("dialog-title").textContent = work.title;
  document.getElementById("dialog-body").textContent = work.body;
  document.getElementById("dialog-tags").replaceChildren(
    ...work.tags.map((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      return li;
    })
  );
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
