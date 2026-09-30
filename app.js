const CORE_IDS = agents.filter(a => !a.optional).map(a => a.id);
const rosterKey = "mao-ai-team-roster-v1";
const profileKey = "mao-ai-team-profile-v2";
let profile = JSON.parse(localStorage.getItem(profileKey) || localStorage.getItem("mao-ai-team-profile-v1") || "{}");
let enabledIds = loadRoster();
let activeCategory = "All";
let activeAgent = null;
let selectedTask = "";

function loadRoster() {
  try {
    const saved = JSON.parse(localStorage.getItem(rosterKey) || "null");
    if (Array.isArray(saved) && saved.length) return saved.filter(id => agents.some(a => a.id === id));
  } catch {}
  return [...CORE_IDS];
}
function saveRoster() { localStorage.setItem(rosterKey, JSON.stringify(enabledIds)); }
function enabledAgents() { return agents.filter(a => enabledIds.includes(a.id)); }
function categoryList() { return ["All", ...new Set(enabledAgents().map(a => a.category))]; }

const teamGrid = document.querySelector("#teamGrid");
const filters = document.querySelector("#filters");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
const profileDialog = document.querySelector("#profileDialog");
const agentDialog = document.querySelector("#agentDialog");
const howDialog = document.querySelector("#howDialog");
const installDialog = document.querySelector("#installDialog");
const rosterDialog = document.querySelector("#rosterDialog");
const installButton = document.querySelector("#installButton");
const profileForm = document.querySelector("#profileForm");
const toast = document.querySelector("#toast");

const LOOK = {
  maya:{s:"#f3c7a3",h:"#2b1b12",x:"helm"}, rex:{s:"#f6d2b0",h:"#f4e27a",x:"laurel"},
  quinn:{s:"#e8b894",h:"#3a2418",x:"wings"}, penelope:{s:"#f0c2ae",h:"#6b2d4a",x:"scroll"},
  cora:{s:"#f5c8b8",h:"#8a3a2a",x:"rose"}, sasha:{s:"#f0c49a",h:"#24160f",x:"wreath"},
  riley:{s:"#efc09a",h:"#4a1d3a",x:"ivy"}, vera:{s:"#d9a078",h:"#1b120e",x:"forge"},
  emmy:{s:"#f2c8b4",h:"#f3d36a",x:"iris"}, felix:{s:"#e9b99a",h:"#2c1a14",x:"thread"},
  stella:{s:"#f6cbb8",h:"#7a2a48",x:"pearl"}, alex:{s:"#ecc09a",h:"#2a211c",x:"scales"},
  ollie:{s:"#efc19a",h:"#3b2416",x:"coin"}, brandi:{s:"#f3c6b0",h:"#4a1f2c",x:"diadem"},
  wendy:{s:"#f0c8a8",h:"#c9a06a",x:"hearth"}, parker:{s:"#e8c09a",h:"#2d2118",x:"owl"},
  ava:{s:"#f4cfc0",h:"#d8b07a",x:"butterfly"}, lina:{s:"#e6b894",h:"#2a3340",x:"bow"},
  drew:{s:"#f5c8b6",h:"#8c2f4a",x:"heart"}, arlo:{s:"#d9a07a",h:"#1a120e",x:"helm"},
  iris:{s:"#efc4a8",h:"#5a3a28",x:"hearth"}, andre:{s:"#e0aa80",h:"#241812",x:"lion"},
  devon:{s:"#ecc2a4",h:"#3d2a44",x:"scroll"}, phoebe:{s:"#f3c49a",h:"#f0c14a",x:"sun"}
};

function portraitSvg(agent) {
  const L = LOOK[agent.id] || {s:"#f0c4a4",h:"#2a1a12",x:"laurel"};
  const c = agent.color;
  const extra = {
    helm:`<path d="M18 46c8-22 76-22 84 0-6-28-78-28-84 0z" fill="${c}"/><path d="M58 18l4 16h-4z" fill="${c}"/>`,
    laurel:`<path d="M24 78c8-18 14-30 8-42" stroke="${c}" stroke-width="3" fill="none"/><path d="M96 78c-8-18-14-30-8-42" stroke="${c}" stroke-width="3" fill="none"/>`,
    wings:`<path d="M14 62c12-18 22-10 28 2-16 2-24 10-28-2z" fill="${c}"/><path d="M106 62c-12-18-22-10-28 2 16 2 24 10 28-2z" fill="${c}"/>`,
    scroll:`<rect x="86" y="78" width="18" height="10" rx="2" fill="${c}"/>`,
    rose:`<circle cx="92" cy="86" r="6" fill="#e35a6a"/>`,
    wreath:`<circle cx="60" cy="46" r="28" fill="none" stroke="${c}" stroke-width="4"/>`,
    ivy:`<path d="M20 90c16-10 24-4 30 6" stroke="#4aa35a" stroke-width="3" fill="none"/>`,
    forge:`<path d="M18 70h16l-4 18H22z" fill="#8a93a3"/>`,
    iris:`<path d="M20 40c20-18 60-18 80 0" stroke="${c}" stroke-width="3" fill="none"/>`,
    thread:`<path d="M18 86c20-20 40 8 64-10" stroke="${c}" stroke-width="3" fill="none"/>`,
    pearl:`<circle cx="60" cy="92" r="4" fill="#fff"/>`,
    scales:`<path d="M44 18h32M60 18v10M44 28h32" stroke="${c}" stroke-width="3"/>`,
    coin:`<circle cx="24" cy="78" r="8" fill="${c}"/>`,
    diadem:`<path d="M36 40h48l-6 8H42z" fill="${c}"/>`,
    hearth:`<path d="M54 92c8-14 20-6 12 8h-16z" fill="#ff7a3d"/>`,
    owl:`<circle cx="24" cy="40" r="7" fill="${c}"/>`,
    butterfly:`<path d="M18 48c10-16 18-2 16 8-10 2-14 6-16-8z" fill="${c}"/>`,
    bow:`<path d="M96 36l16 18-16 4z" fill="${c}"/>`,
    heart:`<path d="M92 80c8-10 18 2 8 12-8 6-12 0-8-12z" fill="#ff5d8f"/>`,
    lion:`<path d="M28 52c-10 4-12 20-2 26" stroke="${c}" stroke-width="6" fill="none"/>`,
    sun:`<circle cx="96" cy="28" r="8" fill="${c}"/>`
  }[L.x] || "";
  return `<svg class="god-face" viewBox="0 0 120 120" aria-hidden="true"><defs><clipPath id="c-${agent.id}"><circle cx="60" cy="60" r="56"/></clipPath><radialGradient id="g-${agent.id}" cx="32%" cy="28%"><stop offset="0%" stop-color="#fff" stop-opacity=".5"/><stop offset="100%" stop-color="${c}"/></radialGradient></defs><circle cx="60" cy="60" r="58" fill="url(#g-${agent.id})"/><g clip-path="url(#c-${agent.id})"><ellipse cx="60" cy="128" rx="58" ry="40" fill="${L.h}"/><ellipse cx="60" cy="72" rx="28" ry="34" fill="${L.s}"/><path d="M32 62c8-28 48-28 56 0-4-22-48-22-56 0z" fill="${L.h}"/><ellipse cx="48" cy="70" rx="6.5" ry="8" fill="#1b1a22"/><ellipse cx="72" cy="70" rx="6.5" ry="8" fill="#1b1a22"/><ellipse cx="46.5" cy="67" rx="2.2" ry="2.6" fill="#fff"/><ellipse cx="70.5" cy="67" rx="2.2" ry="2.6" fill="#fff"/><path d="M56 82c3 4 8 4 11 0" stroke="#b06a5a" stroke-width="2" fill="none" stroke-linecap="round"/>${extra}</g><circle cx="60" cy="60" r="56" fill="none" stroke="${c}" stroke-width="3" opacity=".55"/></svg>`;
}
function botMarkup(agent) {
  const a = agent || agents[0];
  return `<div class="bot" aria-hidden="true">${portraitSvg(a)}</div>`;
}
function escapeHtml(str) {
  const map = {"&": "&"+"amp;", "<": "&"+"lt;", ">": "&"+"gt;", '"': "&"+"quot;", "'": "&#39;"};
  return String(str).replace(/[&<>"']/g, ch => map[ch]);
}
function renderFilters() {
  const cats = categoryList();
  if (!cats.includes(activeCategory)) activeCategory = "All";
  const pool = enabledAgents();
  filters.innerHTML = cats.map(c => {
    const count = c === "All" ? pool.length : pool.filter(a => a.category === c).length;
    return `<button class="filter ${c === activeCategory ? "active" : ""}" data-category="${c}">${c} · ${count}</button>`;
  }).join("");
}
function renderAgents() {
  const term = searchInput.value.trim().toLowerCase();
  const visible = enabledAgents().filter(a =>
    (activeCategory === "All" || a.category === activeCategory) &&
    [a.name, a.title, a.category, a.description, ...a.tasks].join(" ").toLowerCase().includes(term)
  );
  teamGrid.innerHTML = visible.map(a => `
    <article class="agent-card" style="--agent:${a.color}" data-agent="${a.id}" tabindex="0" role="button" aria-label="Open ${a.name}">
      <div class="agent-top"><span class="tag">${a.category}</span>${botMarkup(a)}</div>
      <div class="agent-info">
        <span class="agent-role">${a.title}${a.optional ? " · optional" : ""}</span>
        <h3>${a.name}</h3>
        <p>${a.description}</p>
        <div class="card-actions">
          <button type="button" class="choose-task" data-options="${a.id}">Brief</button>
          <button type="button" class="quick-start" data-quick="${a.id}">Start <span>↗</span></button>
        </div>
      </div>
    </article>`).join("");
  emptyState.hidden = visible.length > 0;
}
function updateProfileUI() {
  document.querySelector("#businessChipText").textContent = profile.brandName || "Add business profile";
  document.querySelector("#businessChip").classList.toggle("ready", Boolean(profile.brandName));
  [...profileForm.elements].forEach(el => { if (el.name) el.value = profile[el.name] || ""; });
  const countEl = document.querySelector("#specialistCount");
  if (countEl) countEl.textContent = String(enabledAgents().length);
  const rosterCount = document.querySelector("#rosterCount");
  if (rosterCount) rosterCount.textContent = `${enabledAgents().length} on desk`;
}
function renderRoster() {
  const list = document.querySelector("#rosterList");
  const groups = { "Core desk": [], "Optional extras": [] };
  agents.forEach(a => (a.optional ? groups["Optional extras"] : groups["Core desk"]).push(a));
  list.innerHTML = Object.entries(groups).map(([label, rows]) => `
    <div class="roster-group">
      <p class="roster-label">${label}</p>
      ${rows.map(a => `
        <label class="roster-row">
          <input type="checkbox" data-roster="${a.id}" ${enabledIds.includes(a.id) ? "checked" : ""} />
          <span class="roster-swatch" style="background:${a.color}"></span>
          <span class="roster-copy"><strong>${escapeHtml(a.name)}</strong><small>${escapeHtml(a.title)}</small></span>
        </label>`).join("")}
    </div>`).join("");
}
function openAgent(id) {
  activeAgent = agents.find(a => a.id === id);
  if (!activeAgent) return;
  selectedTask = activeAgent.tasks[0];
  const content = document.querySelector("#agentModalContent");
  content.style.setProperty("--agent", activeAgent.color);
  content.innerHTML = `
    <div class="agent-modal-header">${botMarkup(activeAgent)}<span class="agent-role">${activeAgent.title}</span><h2>${activeAgent.name}</h2><p>${activeAgent.description}</p></div>
    <div class="agent-modal-body">
      ${profile.brandName ? "" : `<div class="profile-warning">Add a business profile first. The brief is sharper with brand context.</div>`}
      <h3>Task</h3>
      <div class="task-chips">${activeAgent.tasks.map((t, i) => `<button type="button" class="task-chip ${i === 0 ? "selected" : ""}" data-task="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join("")}</div>
      <textarea id="customTask" class="task-input" rows="3" placeholder="Or write the exact deliverable you need..."></textarea>
      <div class="launch-actions">
        <button type="button" class="primary-button" id="launchAgent">Copy brief & open ChatGPT ↗</button>
        <button type="button" class="copy-button" id="copyAgent">Copy only</button>
      </div>
    </div>`;
  if (typeof agentDialog.showModal === "function") agentDialog.showModal();
  else agentDialog.setAttribute("open", "");
}
function startAgent(id) {
  activeAgent = agents.find(a => a.id === id);
  if (!activeAgent) return;
  selectedTask = activeAgent.tasks[0];
  launchInChatGPT(createPrompt(activeAgent.tasks[0]), `${activeAgent.name} ready — press Enter in ChatGPT`);
}
function createPrompt(taskOverride = "") {
  const custom = document.querySelector("#customTask")?.value.trim();
  const task = taskOverride || custom || selectedTask;
  const context = profile.brandName
    ? `\nBUSINESS CONTEXT\n- Brand: ${profile.brandName}\n- Industry: ${profile.industry || "Not provided"}\n- Offer: ${profile.offer || "Not provided"}\n- Customers: ${profile.audience || "Not provided"}\n- Voice: ${profile.voice || "Not provided"}\n- Market: ${profile.market || "Not provided"}\n- Goal: ${profile.goal || "Not provided"}\n- Channels: ${profile.channels || "Not provided"}`
    : "\nBUSINESS CONTEXT\nNo profile yet. Ask only for facts that would change the deliverable.";
  return `You are ${activeAgent.name}, ${activeAgent.title}.\n\nMETHOD\n${activeAgent.method}\n${context}\n\nTASK\n${task}\n\nRULES\n- Confirm the brief in two sentences, then deliver.\n- Ask at most three questions, and only if missing answers would change the work.\n- Produce a finished artifact, not a lecture.\n- Mark assumptions and anything that needs live verification.\n- End with three next actions.\n\nBegin.`;
}
async function copyPrompt() {
  const prompt = createPrompt();
  try { await navigator.clipboard.writeText(prompt); showToast("Brief copied"); }
  catch { showToast("Copy failed — select the brief and copy it"); }
  return prompt;
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}
function launchInChatGPT(prompt, label) {
  navigator.clipboard?.writeText(prompt).catch(() => {});
  const payload = prompt.length > 6000 ? "The specialist brief is on my clipboard. Ask me to paste it, then execute it now." : prompt;
  const win = window.open(`https://chatgpt.com/?q=${encodeURIComponent(payload)}`, "_blank", "noopener,noreferrer");
  if (!win) showToast("Popup blocked — brief copied. Open ChatGPT and paste.");
  else showToast(label || "Brief loaded — press Enter to send");
}
function refreshDesk() { renderFilters(); renderAgents(); updateProfileUI(); }

filters.addEventListener("click", e => {
  const button = e.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters(); renderAgents();
});
teamGrid.addEventListener("click", e => {
  const quick = e.target.closest("[data-quick]");
  if (quick) { e.preventDefault(); e.stopPropagation(); startAgent(quick.dataset.quick); return; }
  const options = e.target.closest("[data-options]");
  const card = e.target.closest("[data-agent]");
  if (options || card) {
    e.preventDefault();
    openAgent((options && options.dataset.options) || card.dataset.agent);
  }
});
teamGrid.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-agent]")) {
    e.preventDefault();
    openAgent(e.target.dataset.agent);
  }
});
searchInput.addEventListener("input", renderAgents);
document.addEventListener("keydown", e => {
  if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) { e.preventDefault(); searchInput.focus(); }
  if (e.key === "Escape") [agentDialog, profileDialog, howDialog, installDialog, rosterDialog].forEach(d => d.open && d.close());
});
document.querySelector("#setupButton").addEventListener("click", () => profileDialog.showModal());
document.querySelector("#profileButton").addEventListener("click", () => profileDialog.showModal());
document.querySelector("#businessChip").addEventListener("click", () => profileDialog.showModal());
document.querySelector("#howButton").addEventListener("click", () => howDialog.showModal());
document.querySelector("#rosterButton").addEventListener("click", () => { renderRoster(); rosterDialog.showModal(); });
document.querySelector("#rosterCore").addEventListener("click", () => {
  enabledIds = [...CORE_IDS]; saveRoster(); renderRoster(); refreshDesk(); showToast("Core desk only");
});
document.querySelector("#rosterAll").addEventListener("click", () => {
  enabledIds = agents.map(a => a.id); saveRoster(); renderRoster(); refreshDesk(); showToast("All roles on");
});
rosterDialog.addEventListener("change", e => {
  const box = e.target.closest("[data-roster]");
  if (!box) return;
  const id = box.dataset.roster;
  if (box.checked) { if (!enabledIds.includes(id)) enabledIds.push(id); }
  else {
    if (enabledIds.length === 1) { box.checked = true; showToast("Keep at least one specialist"); return; }
    enabledIds = enabledIds.filter(x => x !== id);
  }
  saveRoster(); refreshDesk();
});

let deferredInstallPrompt = null;
const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
if (isStandalone) installButton.hidden = true;
function renderInstallGuide() {
  const guide = document.querySelector("#installGuide");
  if (isStandalone) { guide.innerHTML = `<div class="notice"><span>✓</span><p><strong>Installed.</strong> You are in the app view.</p></div>`; return; }
  if (deferredInstallPrompt) { guide.innerHTML = `<button class="primary-button native-install" id="nativeInstall">Install Mao's AI Team</button>`; return; }
  guide.innerHTML = isIos
    ? `<div class="install-step"><span>1</span><div><strong>Open in Safari</strong></div></div><div class="install-step"><span>2</span><div><strong>Share</strong></div></div><div class="install-step"><span>3</span><div><strong>Add to Home Screen</strong></div></div>`
    : `<div class="install-step"><span>1</span><div><strong>Browser menu</strong></div></div><div class="install-step"><span>2</span><div><strong>Install app</strong></div></div>`;
}
window.addEventListener("beforeinstallprompt", event => { event.preventDefault(); deferredInstallPrompt = event; renderInstallGuide(); });
installButton.addEventListener("click", () => { renderInstallGuide(); installDialog.showModal(); });
installDialog.addEventListener("click", async event => {
  if (event.target.id !== "nativeInstall" || !deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installDialog.close();
});
document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => document.querySelector(`#${b.dataset.close}`).close()));
[profileDialog, agentDialog, howDialog, installDialog, rosterDialog].forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close(); }));
profileForm.addEventListener("submit", e => {
  e.preventDefault();
  profile = Object.fromEntries(new FormData(profileForm).entries());
  localStorage.setItem(profileKey, JSON.stringify(profile));
  updateProfileUI(); profileDialog.close(); showToast("Profile saved");
});
document.querySelector("#clearProfile").addEventListener("click", () => {
  profile = {}; localStorage.removeItem(profileKey); localStorage.removeItem("mao-ai-team-profile-v1");
  profileForm.reset(); updateProfileUI(); showToast("Profile cleared");
});
agentDialog.addEventListener("click", async e => {
  const task = e.target.closest("[data-task]");
  if (task) {
    selectedTask = task.dataset.task;
    document.querySelectorAll(".task-chip").forEach(b => b.classList.toggle("selected", b === task));
    document.querySelector("#customTask").value = "";
  }
  if (e.target.id === "copyAgent") await copyPrompt();
  if (e.target.id === "launchAgent") launchInChatGPT(createPrompt(), "Brief loaded — press Enter to send");
});
refreshDesk();
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
