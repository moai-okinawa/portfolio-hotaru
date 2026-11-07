// 制作物（サンプル）。差し替えるときはこの配列を編集してください。
const works = [
  {
    title: "カフェのLPサイト",
    year: "2026",
    icon: "☕",
    color: "#2a3d2f",
    summary: "地域のカフェ向け1枚ものサイト（サンプル）",
    body: "メニュー・営業時間・地図をスマホで見やすくまとめたランディングページ。AIで文章のたたき台を作り、店主さんの言葉に寄せて仕上げる流れを想定しています。",
    tags: ["HTML", "CSS", "AIライティング"],
  },
  {
    title: "予約管理の自動化",
    year: "2026",
    icon: "📅",
    color: "#2f3a24",
    summary: "フォーム→スプレッドシート→通知の仕組み（サンプル）",
    body: "問い合わせフォームの内容をスプレッドシートに自動で記録し、担当者に通知する仕組み。手作業の転記をなくすことを目指しました。",
    tags: ["Googleフォーム", "GAS", "自動化"],
  },
  {
    title: "AIプロンプト集",
    year: "2026",
    icon: "💡",
    color: "#24363a",
    summary: "日々の業務で使えるプロンプトのまとめ（サンプル）",
    body: "メール返信、議事録要約、SNS投稿案づくりなど、よく使う場面ごとにプロンプトを整理した資料。初めてAIを使う人でも真似できる形にしています。",
    tags: ["ChatGPT", "Claude", "資料作成"],
  },
];

const list = document.getElementById("works-list");
const dialog = document.getElementById("work-dialog");

works.forEach((work) => {
  const button = document.createElement("button");
  button.className = "work";
  button.type = "button";
  button.innerHTML = `
    <div class="work-thumb" style="background:${work.color}" aria-hidden="true">${work.icon}</div>
    <div class="work-body">
      <h3></h3>
      <p></p>
    </div>`;
  button.querySelector("h3").textContent = work.title;
  button.querySelector("p").textContent = work.summary;
  button.addEventListener("click", () => openWork(work));
  list.appendChild(button);
});

function openWork(work) {
  document.getElementById("dialog-meta").textContent = work.year;
  document.getElementById("dialog-title").textContent = work.title;
  document.getElementById("dialog-body").textContent = work.body;
  const tags = document.getElementById("dialog-tags");
  tags.replaceChildren(
    ...work.tags.map((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      return li;
    })
  );
  dialog.showModal();
}

// 背景クリックで閉じる
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

document.getElementById("year").textContent = new Date().getFullYear();

// ホタルの光のアニメーション
const canvas = document.getElementById("fireflies");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let flies = [];

function resize() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  const count = Math.round(Math.min(48, window.innerWidth / 25));
  flies = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 1 + Math.random() * 2,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    phase: Math.random() * Math.PI * 2,
  }));
}

function draw(t) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (const f of flies) {
    f.x += f.vx + Math.sin(t / 2000 + f.phase) * 0.15;
    f.y += f.vy + Math.cos(t / 2500 + f.phase) * 0.15;
    if (f.x < -10) f.x = window.innerWidth + 10;
    if (f.x > window.innerWidth + 10) f.x = -10;
    if (f.y < -10) f.y = window.innerHeight + 10;
    if (f.y > window.innerHeight + 10) f.y = -10;
    const alpha = 0.25 + 0.75 * Math.max(0, Math.sin(t / 900 + f.phase));
    const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 8);
    g.addColorStop(0, `rgba(216, 245, 107, ${alpha})`);
    g.addColorStop(1, "rgba(216, 245, 107, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r * 8, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

if (!reduceMotion) {
  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}
