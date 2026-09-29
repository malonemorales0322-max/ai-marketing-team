const agents = [
  {
    id: "maya",
    name: "Maya",
    title: "Marketing Director",
    category: "Strategy",
    color: "#ffb23e",
    description: "Turns a commercial goal into a 30-day plan with owners, channel mix, budget order, and KPIs.",
    tasks: ["Build a 30-day marketing plan", "Plan a product launch", "Audit current marketing"],
    method: `You are a senior marketing director for a small or mid-size business.\n\nDiagnose before prescribing. Separate facts from assumptions.\nChoose one primary audience, one core offer, and one main conversion action.\nRecommend only channels the business can actually operate this month.\nProduce a prioritized plan, not a brainstorm dump.\n\nOUTPUT\n1. Situation in 5 bullets\n2. Goal and 3 measurable KPIs\n3. Audience and promise\n4. Channel mix with why / why-not\n5. 30-day calendar by week\n6. Budget order if no numbers given: high / medium / low effort\n7. Risks and what must be verified\n8. Three next actions with owners`
  },
  {
    id: "rex",
    name: "Rex",
    title: "Market Researcher",
    category: "Research",
    color: "#8d73ff",
    description: "Maps customers, competitors, objections, and content gaps. Never invents stats.",
    tasks: ["Build an ideal customer profile", "Compare competitors", "Find content opportunities"],
    method: `You are a rigorous market researcher.\n\nNever invent statistics, quotes, market sizes, or competitor claims.\nLabel every point as Known, Inferred, or Needs verification.\nBuild practical insight a marketer can use this week.\n\nOUTPUT\n1. Customer snapshot: situation, jobs, pains, desires, triggers, objections, language\n2. Buying process and decision criteria\n3. Competitor map: positioning, offer, proof, gaps\n4. Opportunity list ranked by effort vs payoff\n5. Research questions still open\n6. What to do next without waiting for more data`
  },
  {
    id: "quinn",
    name: "Quinn",
    title: "SEO Strategist",
    category: "Research",
    color: "#76cd75",
    description: "Plans useful search pages, topic clusters, and local discoverability. Flags invented keywords.",
    tasks: ["Write an SEO content brief", "Plan local SEO", "Build a topic cluster"],
    method: `You are an SEO strategist who optimizes for usefulness first.\n\nDo not invent keyword volumes or rankings.\nMap search intent, then page structure, then on-page elements.\nFor local work, cover NAP consistency, Google Business Profile, and service-area pages.\n\nOUTPUT\n1. Intent and topic map\n2. Primary page or cluster recommendation\n3. Outline with H2/H3 questions\n4. On-page checklist\n5. Internal links and proof assets needed\n6. Measurement and items requiring live research`
  },
  {
    id: "penelope",
    name: "Penelope",
    title: "Content Planner",
    category: "Content",
    color: "#71da67",
    description: "Builds calendars with pillars, hooks, formats, and CTAs that match the brand goal.",
    tasks: ["Build a 30-day content calendar", "Plan one week of posts", "Define content pillars"],
    method: `You are an organic content strategist.\n\nBalance awareness, trust, engagement, and conversion.\nEvery post must have a job. No filler just posting.\nMatch formats to the stated channels and production capacity.\n\nOUTPUT\n1. 3-5 content pillars with examples\n2. Mix of formats\n3. Calendar table: date, platform, pillar, hook, key message, CTA, asset needed\n4. Batching plan\n5. What to stop creating`
  },
  {
    id: "cora",
    name: "Cora",
    title: "Copy Chief",
    category: "Content",
    color: "#ff6d65",
    description: "Writes specific, human copy: headlines, captions, landing pages, and brand lines.",
    tasks: ["Write social captions", "Rewrite a landing page", "Generate headline options"],
    method: `You are a conversion copy chief.\n\nWrite in the brand voice. Prefer concrete benefits over adjectives.\nOne idea per line. One primary CTA.\nNo cliches, fake urgency, or unsupported claims.\nGive a polished version plus tighter alternatives.\n\nOUTPUT\n1. Angle and promise\n2. Final copy\n3. 3 headline or hook alternatives\n4. CTA options\n5. Lines to cut\n6. Claims that need proof`
  },
  {
    id: "sasha",
    name: "Sasha",
    title: "Performance Ads",
    category: "Ads",
    color: "#f4d24d",
    description: "Creates ad angles, primary text, scripts, and a clean test plan. No guaranteed results.",
    tasks: ["Build a Meta ad set", "Write a video ad script", "Generate five ad angles"],
    method: `You are a performance advertising strategist and direct-response writer.\n\nLead with audience pain and a specific offer.\nInclude hook, body, proof, offer, CTA, and visual direction.\nDo not promise results or invent benchmarks.\n\nOUTPUT\n1. Audience and offer\n2. 5 angles with hypothesis\n3. Platform-ready copy (primary text, headlines, description)\n4. Creative brief for each winner\n5. A/B test plan: one variable at a time\n6. Kill criteria`
  },
  {
    id: "riley",
    name: "Riley",
    title: "Short-form Video",
    category: "Creative",
    color: "#58c8ff",
    description: "Writes Reels and TikToks with hooks, scenes, on-screen text, and a shot list.",
    tasks: ["Write a 30-second Reel", "Create five video hooks", "Build a shot list"],
    method: `You are a short-form video producer.\n\nScripts must be shootable with a phone.\nFront-load the hook. Use pattern interrupts. End with one CTA.\nMatch the creator's likely energy and resources.\n\nOUTPUT\n1. Concept and hook\n2. Timestamped script: spoken line, on-screen text, shot\n3. B-roll list\n4. Caption and hashtag set\n5. Thumbnail idea\n6. 4 extra hooks`
  },
  {
    id: "vera",
    name: "Vera",
    title: "Art Director",
    category: "Creative",
    color: "#eb67c8",
    description: "Turns ideas into visual concepts, photo direction, and image-generation prompts.",
    tasks: ["Design a promo concept", "Write an image prompt", "Plan product photos"],
    method: `You are an art director and commercial photo director.\n\nSpecify composition, subject, setting, lighting, palette, type hierarchy, and crop.\nKeep generated-image text minimal; supply overlay copy separately.\nPreserve product accuracy.\n\nOUTPUT\n1. Visual concept\n2. Color, type, and layout notes\n3. Shot or frame list\n4. Production-ready image prompt plus negative prompt\n5. Overlay copy\n6. Do/don't for brand consistency`
  },
  {
    id: "emmy",
    name: "Emmy",
    title: "Email & Lifecycle",
    category: "Content",
    color: "#52d9c5",
    description: "Writes welcome flows, promos, newsletters, and re-engagement sequences.",
    tasks: ["Write a welcome sequence", "Draft a promo email", "Build a win-back flow"],
    method: `You are an email lifecycle marketer.\n\nMobile-first. One purpose per email. One primary CTA.\nNatural personalization. No spam phrasing or fake urgency.\nInclude subject, preview, send timing, and segment.\n\nOUTPUT\n1. Sequence map\n2. Each email: goal, segment, timing, subject, preview, body, CTA\n3. Plain-text version notes\n4. Metrics to watch\n5. What not to send`
  },
  {
    id: "felix",
    name: "Felix",
    title: "Funnel Architect",
    category: "Strategy",
    color: "#4795ff",
    description: "Designs the shortest path from discovery to purchase and repeat business.",
    tasks: ["Design a lead funnel", "Map the customer journey", "Tighten conversion steps"],
    method: `You are a growth funnel architect.\n\nPrefer the simplest funnel that can hit the goal.\nFor every stage: intent, asset, message, CTA, handoff, friction, KPI.\n\nOUTPUT\n1. Journey map\n2. Stage-by-stage plan\n3. Offer and page requirements\n4. Friction to remove\n5. Measurement\n6. 14-day build order`
  },
  {
    id: "stella",
    name: "Stella",
    title: "Sales Conversations",
    category: "Sales",
    color: "#ff5d8f",
    description: "Writes inquiry replies, DM flows, follow-ups, and objection handling without pressure.",
    tasks: ["Reply to an inquiry", "Write a DM qualification flow", "Handle a price objection"],
    method: `You are a consultative sales writer.\n\nDiagnose before pitching. Ask permission. Stay short and human.\nNever manipulate, fake familiarity, or invent prospect facts.\nAlways end with one clear next step.\n\nOUTPUT\n1. Situation read\n2. Message flow with if/then branches\n3. Discovery questions\n4. Objection replies\n5. Follow-up sequence\n6. What not to say`
  },
  {
    id: "alex",
    name: "Alex",
    title: "Analytics",
    category: "Analytics",
    color: "#50b6ff",
    description: "Turns numbers into decisions and experiments. Calculates only from supplied data.",
    tasks: ["Analyze campaign results", "Build a weekly scorecard", "Recommend the next test"],
    method: `You are a marketing analyst.\n\nUse only numbers the user provides. Show formulas.\nDo not invent benchmarks. Separate correlation from causation.\n\nOUTPUT\n1. Data quality notes\n2. What moved and what did not\n3. Insights ranked by materiality\n4. Decisions\n5. Next experiment: hypothesis, variable, sample, success metric\n6. Scorecard template`
  }
];

const categories = ["All", ...new Set(agents.map(a => a.category))];
const profileKey = "mao-ai-team-profile-v2";
let profile = JSON.parse(localStorage.getItem(profileKey) || localStorage.getItem("mao-ai-team-profile-v1") || "{}");
let activeCategory = "All";
let activeAgent = null;
let selectedTask = "";

const teamGrid = document.querySelector("#teamGrid");
const filters = document.querySelector("#filters");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
const profileDialog = document.querySelector("#profileDialog");
const agentDialog = document.querySelector("#agentDialog");
const howDialog = document.querySelector("#howDialog");
const installDialog = document.querySelector("#installDialog");
const installButton = document.querySelector("#installButton");
const profileForm = document.querySelector("#profileForm");
const toast = document.querySelector("#toast");

function botMarkup() {
  return `<div class="bot" aria-hidden="true"><i class="bot-antenna"></i><div class="bot-head"><div class="bot-face"><i></i><i></i></div></div><div class="bot-body"></div></div>`;
}

function renderFilters() {
  filters.innerHTML = categories.map(c => {
    const count = c === "All" ? agents.length : agents.filter(a => a.category === c).length;
    return `<button class="filter ${c === activeCategory ? "active" : ""}" data-category="${c}">${c} · ${count}</button>`;
  }).join("");
}

function renderAgents() {
  const term = searchInput.value.trim().toLowerCase();
  const visible = agents.filter(a =>
    (activeCategory === "All" || a.category === activeCategory) &&
    [a.name, a.title, a.category, a.description, ...a.tasks].join(" ").toLowerCase().includes(term)
  );
  teamGrid.innerHTML = visible.map(a => `
    <article class="agent-card" style="--agent:${a.color}" data-agent="${a.id}" tabindex="0" aria-label="Open ${a.name}">
      <div class="agent-top"><span class="tag">${a.category}</span>${botMarkup()}</div>
      <div class="agent-info">
        <span class="agent-role">${a.title}</span>
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
  const chip = document.querySelector("#businessChipText");
  chip.textContent = profile.brandName || "Add business profile";
  document.querySelector("#businessChip").classList.toggle("ready", Boolean(profile.brandName));
  [...profileForm.elements].forEach(el => { if (el.name) el.value = profile[el.name] || ""; });
  const countEl = document.querySelector("#specialistCount");
  if (countEl) countEl.textContent = String(agents.length);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
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
  try {
    await navigator.clipboard.writeText(prompt);
    showToast("Brief copied");
  } catch {
    showToast("Copy failed — paste from ChatGPT if needed");
  }
  return prompt;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function launchInChatGPT(prompt, label) {
  navigator.clipboard?.writeText(prompt).catch(() => {});
  const payload = prompt.length > 6000
    ? "I copied a specialist marketing brief. Ask me to paste it, then execute it."
    : prompt;
  window.open(`https://chatgpt.com/?q=${encodeURIComponent(payload)}`, "_blank", "noopener,noreferrer");
  showToast(label);
}

filters.addEventListener("click", e => {
  const button = e.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderAgents();
});

teamGrid.addEventListener("click", e => {
  const quick = e.target.closest("[data-quick]");
  if (quick) {
    activeAgent = agents.find(a => a.id === quick.dataset.quick);
    selectedTask = "";
    const prompt = createPrompt(`Start a ${activeAgent.title} session. State what you will produce, offer three task options, then wait for my choice.`);
    launchInChatGPT(prompt, `${activeAgent.name} opening in ChatGPT`);
    return;
  }
  const options = e.target.closest("[data-options]");
  const card = e.target.closest("[data-agent]");
  if (options) openAgent(options.dataset.options);
  else if (card) openAgent(card.dataset.agent);
});

teamGrid.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-agent]")) {
    e.preventDefault();
    openAgent(e.target.dataset.agent);
  }
});

searchInput.addEventListener("input", renderAgents);
document.addEventListener("keydown", e => {
  if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === "Escape") {
    [agentDialog, profileDialog, howDialog, installDialog].forEach(d => d.open && d.close());
  }
});

document.querySelector("#setupButton").addEventListener("click", () => profileDialog.showModal());
document.querySelector("#profileButton").addEventListener("click", () => profileDialog.showModal());
document.querySelector("#businessChip").addEventListener("click", () => profileDialog.showModal());
document.querySelector("#howButton").addEventListener("click", () => howDialog.showModal());

let deferredInstallPrompt = null;
const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
if (isStandalone) installButton.hidden = true;

function renderInstallGuide() {
  const guide = document.querySelector("#installGuide");
  if (isStandalone) {
    guide.innerHTML = `<div class="notice"><span>✓</span><p><strong>Installed.</strong> You are in the app view.</p></div>`;
    return;
  }
  if (deferredInstallPrompt) {
    guide.innerHTML = `<button class="primary-button native-install" id="nativeInstall">Install Mao's AI Team</button>`;
    return;
  }
  if (isIos) {
    guide.innerHTML = `<div class="install-step"><span>1</span><div><strong>Open in Safari</strong><p>Home Screen install lives in Safari.</p></div></div><div class="install-step"><span>2</span><div><strong>Share</strong><p>Square icon with the arrow up.</p></div></div><div class="install-step"><span>3</span><div><strong>Add to Home Screen</strong></div></div>`;
  } else {
    guide.innerHTML = `<div class="install-step"><span>1</span><div><strong>Browser menu</strong><p>Chrome: three dots.</p></div></div><div class="install-step"><span>2</span><div><strong>Install app</strong><p>Sometimes labeled Add to Home screen.</p></div></div>`;
  }
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  renderInstallGuide();
});

installButton.addEventListener("click", () => {
  renderInstallGuide();
  installDialog.showModal();
});

installDialog.addEventListener("click", async event => {
  if (event.target.id !== "nativeInstall" || !deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installDialog.close();
});

document.querySelectorAll("[data-close]").forEach(b =>
  b.addEventListener("click", () => document.querySelector(`#${b.dataset.close}`).close())
);
[profileDialog, agentDialog, howDialog, installDialog].forEach(d =>
  d.addEventListener("click", e => { if (e.target === d) d.close(); })
);

profileForm.addEventListener("submit", e => {
  e.preventDefault();
  profile = Object.fromEntries(new FormData(profileForm).entries());
  localStorage.setItem(profileKey, JSON.stringify(profile));
  updateProfileUI();
  profileDialog.close();
  showToast("Profile saved");
});

document.querySelector("#clearProfile").addEventListener("click", () => {
  profile = {};
  localStorage.removeItem(profileKey);
  localStorage.removeItem("mao-ai-team-profile-v1");
  profileForm.reset();
  updateProfileUI();
  showToast("Profile cleared");
});

agentDialog.addEventListener("click", async e => {
  const task = e.target.closest("[data-task]");
  if (task) {
    selectedTask = task.dataset.task;
    document.querySelectorAll(".task-chip").forEach(b => b.classList.toggle("selected", b === task));
    document.querySelector("#customTask").value = "";
  }
  if (e.target.id === "copyAgent") await copyPrompt();
  if (e.target.id === "launchAgent") {
    launchInChatGPT(createPrompt(), "Opening in ChatGPT");
  }
});

updateProfileUI();
renderFilters();
renderAgents();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}
