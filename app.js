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

function botMarkup() {
  return `<div class="bot" aria-hidden="true"><span class="bot-orb"><i></i><i></i></span></div>`;
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({ "&": "&", "<": "<", ">": ">", '"': """, "'": "&#39;" }[ch]));
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
    <article class="agent-card" style="--agent:${a.color}" data-agent="${a.id}" tabindex="0" aria-label="Start ${a.name}">
      <div class="agent-top"><span class="tag">${a.category}</span>${botMarkup()}</div>
      <div class="agent-info">
        <span class="agent-role">${a.title}${a.optional ? " · optional" : ""}</span>
        <h3>${a.name}</h3>
        <p>${a.description}</p>
        <div class="card-actions">
          <button class="choose-task" data-options="${a.id}">Brief</button>
          <button class="quick-start" data-quick="${a.id}">Start <span>↗</span></button>
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
  selectedTask = activeAgent.tasks[0];
  const content = document.querySelector("#agentModalContent");
  content.style.setProperty("--agent", activeAgent.color);
  content.innerHTML = `
    <div class="agent-modal-header">${botMarkup()}<span class="agent-role">${activeAgent.title}</span><h2>${activeAgent.name}</h2><p>${activeAgent.description}</p></div>
    <div class="agent-modal-body">
      ${profile.brandName ? "" : `<div class="profile-warning">Add a business profile first. The brief is sharper with brand context.</div>`}
      <h3>Task</h3>
      <div class="task-chips">${activeAgent.tasks.map((t, i) => `<button class="task-chip ${i === 0 ? "selected" : ""}" data-task="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join("")}</div>
      <textarea id="customTask" class="task-input" rows="3" placeholder="Or write the exact deliverable you need..."></textarea>
      <div class="launch-actions">
        <button class="primary-button" id="launchAgent">Copy brief & open ChatGPT ↗</button>
        <button class="copy-button" id="copyAgent">Copy only</button>
      </div>
    </div>`;
  agentDialog.showModal();
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
  catch { showToast("Copy failed — paste from ChatGPT if needed"); }
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
  window.open(`https://chatgpt.com/?q=${encodeURIComponent(payload)}`, "_blank", "noopener,noreferrer");
  showToast(label || "Brief loaded — press Enter to send");
}
function refreshDesk() { renderFilters(); renderAgents(); updateProfileUI(); }

filters.addEventListener("click", e => {
  const button = e.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters(); renderAgents();
});
teamGrid.addEventListener("click", e => {
  const options = e.target.closest("[data-options]");
  if (options) {
    openAgent(options.dataset.options);
    return;
  }
  const card = e.target.closest("[data-agent]");
  if (card) startAgent(card.dataset.agent);
});
teamGrid.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-agent]")) {
    e.preventDefault();
    startAgent(e.target.dataset.agent);
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
