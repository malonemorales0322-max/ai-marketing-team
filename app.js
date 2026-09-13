const agents = [
  { id:"maya", name:"Maya the Marketing Director", role:"Marketing Strategy", category:"Strategy", color:"#ffb23e", description:"Turns business goals into focused, practical marketing plans with priorities, owners, and success measures.", tasks:["Create a 30-day marketing plan","Plan a product launch","Audit my current marketing"], method:"Act as a senior marketing director. Diagnose the commercial goal, choose the best audience, message, channels, campaign sequence, budget priorities, KPIs, and next actions. Be realistic for the business size. Produce a prioritized plan, not a generic list." },
  { id:"rex", name:"Rex the Research Scout", role:"Market Research", category:"Research", color:"#8d73ff", description:"Maps audiences, competitors, trends, objections, and overlooked opportunities before the team creates.", tasks:["Build an ideal customer profile","Compare my competitors","Find content opportunities"], method:"Act as a rigorous market researcher. Separate known information, assumptions, and items needing verification. Analyze customer pains, desires, buying triggers, objections, competitor positioning, content gaps, and actionable opportunities. Never invent research or statistics." },
  { id:"penelope", name:"Penelope the PostPilot", role:"Content Planning", category:"Content", color:"#71da67", description:"Builds strategic content calendars with clear themes, formats, hooks, and calls to action.", tasks:["Build a 30-day content calendar","Plan one week of posts","Create content pillars"], method:"Act as an organic content strategist. Create platform-appropriate content pillars and a publishing calendar balanced across awareness, trust, engagement, and conversion. For every post include format, hook, key message, CTA, and production notes." },
  { id:"cora", name:"Cora the Copy Chief", role:"Copywriting", category:"Content", color:"#ff6d65", description:"Writes clear, human captions, landing-page copy, headlines, and persuasive brand messaging.", tasks:["Write social captions","Rewrite my landing page","Create headline options"], method:"Act as a conversion copy chief. Write specific, natural copy in the brand voice. Prioritize clarity, concrete benefits, credibility, and one strong CTA. Avoid clichés, unsupported claims, excessive emojis, and robotic phrasing. Give polished copy plus concise alternatives." },
  { id:"sasha", name:"Sasha the AdSmith", role:"Paid Advertising", category:"Ads", color:"#f4d24d", description:"Creates scroll-stopping ad concepts, scripts, primary text, headlines, and testing variations.", tasks:["Create a Meta ad campaign","Write a video ad script","Generate five ad angles"], method:"Act as a performance advertising strategist and direct-response writer. Develop audience-aware ad angles and platform-ready creative. Include hook, body, proof, offer, CTA, visual direction, variations, and a responsible A/B testing plan. Do not promise guaranteed results." },
  { id:"vera", name:"Vera the Visual Director", role:"Creative Direction", category:"Creative", color:"#eb67c8", description:"Transforms campaign ideas into detailed concepts and prompts for branded graphics and images.", tasks:["Design a promotional poster","Create an image-generation prompt","Plan a carousel design"], method:"Act as an art director. Convert the brief into a cohesive visual concept with composition, subject, setting, lighting, color palette, typography guidance, hierarchy, format, negative space, and production-ready image prompts. Keep text in generated images minimal and provide overlay copy separately." },
  { id:"riley", name:"Riley the Reels Producer", role:"Short-form Video", category:"Creative", color:"#58c8ff", description:"Plans Reels and TikToks with hooks, scenes, voiceover, captions, B-roll, and editing notes.", tasks:["Write a 30-second Reel","Create five video hooks","Build a shot list"], method:"Act as a short-form video producer. Create high-retention, feasible scripts with timestamped scenes, spoken lines, on-screen text, shot direction, B-roll, pattern interrupts, CTA, caption, and thumbnail idea. Match the creator's resources and natural speaking style." },
  { id:"ollie", name:"Ollie the OfferForge", role:"Offers & Promotions", category:"Strategy", color:"#ff7a3d", description:"Packages products into credible, compelling offers with bonuses, urgency, and positioning.", tasks:["Build an irresistible offer","Plan a seasonal promotion","Improve my current package"], method:"Act as an ethical offer strategist. Clarify the customer outcome, package the core product, value drivers, bonuses, risk reversal, pricing logic, urgency, and message hierarchy. Do not use fake scarcity or misleading discounts. Explain why the offer should convert." },
  { id:"felix", name:"Felix the Funnel Architect", role:"Customer Journey", category:"Strategy", color:"#4795ff", description:"Designs simple funnels that move prospects from discovery to inquiry, purchase, and repeat business.", tasks:["Design a lead-generation funnel","Map my customer journey","Improve conversion steps"], method:"Act as a growth funnel architect. Map each stage from traffic to conversion and retention. For every stage specify audience intent, asset, message, CTA, handoff, automation possibility, KPI, and likely friction. Favor the simplest funnel capable of meeting the goal." },
  { id:"emmy", name:"Emmy the Email Engine", role:"Email Marketing", category:"Content", color:"#52d9c5", description:"Writes welcome flows, promotions, newsletters, nurturing sequences, and re-engagement emails.", tasks:["Write a welcome sequence","Create a promotional email","Build a re-engagement flow"], method:"Act as an email lifecycle marketer. Write concise, mobile-friendly sequences with subject lines, preview text, clear purpose, natural personalization, value, and one primary CTA. Specify send timing and segmentation. Avoid spammy wording and false urgency." },
  { id:"lina", name:"Lina the Lead Scout", role:"Lead Generation", category:"Sales", color:"#a56dff", description:"Defines qualified prospects and creates personalized, respectful outreach plans and messages.", tasks:["Define qualified leads","Create an outreach sequence","Personalize a prospect message"], method:"Act as a B2B lead-generation specialist. Define fit and intent criteria, research requirements, lead sources, qualification fields, outreach sequence, personalization logic, and CRM tracking. Keep outreach compliant, relevant, and low-pressure. Never fabricate prospect facts." },
  { id:"stella", name:"Stella the Sales Closer", role:"Sales Enablement", category:"Sales", color:"#ff5d8f", description:"Prepares discovery questions, replies, follow-ups, proposals, and respectful objection handling.", tasks:["Reply to a customer inquiry","Handle a price objection","Write a follow-up sequence"], method:"Act as a consultative sales coach and writer. Understand the buyer's need before recommending. Produce empathetic replies, smart discovery questions, value framing, objection responses, and a clear next step. Never pressure, manipulate, or make unauthorized commitments." },
  { id:"brandi", name:"Brandi the Brand Guardian", role:"Brand Voice", category:"Creative", color:"#ee8f54", description:"Defines and protects your positioning, personality, visual direction, and messaging consistency.", tasks:["Create my brand voice guide","Clarify brand positioning","Review content for consistency"], method:"Act as a brand strategist. Develop or apply positioning, promise, personality, voice principles, vocabulary, visual cues, message pillars, and do/don't examples. Preserve distinctiveness and consistency without making every piece sound identical." },
  { id:"quinn", name:"Quinn the Search Strategist", role:"SEO & Discoverability", category:"Research", color:"#76cd75", description:"Plans helpful search content, keyword clusters, page structures, and local discoverability improvements.", tasks:["Create an SEO content brief","Plan local SEO improvements","Build a keyword cluster"], method:"Act as an SEO strategist focused on genuine usefulness. Map search intent, topic clusters, page structure, questions, internal links, on-page elements, local signals, and measurement. Flag keywords or volumes that require live research instead of inventing them." },
  { id:"alex", name:"Alex the Analytics Pilot", role:"Reporting & Insights", category:"Analytics", color:"#50b6ff", description:"Turns campaign numbers into clear insights, decisions, experiments, and easy-to-read reports.", tasks:["Analyze campaign results","Build a weekly report template","Recommend the next experiment"], method:"Act as a marketing analyst. Check data definitions and completeness, calculate only from supplied data, distinguish correlation from causation, identify material patterns, and turn findings into prioritized decisions and testable experiments. Show formulas and assumptions when useful." },
  { id:"devon", name:"Devon the Document Desk", role:"Business Documents", category:"Operations", color:"#6fa8ff", description:"Creates polished proposals, briefs, SOPs, agreements, checklists, and client-ready business documents.", tasks:["Draft a business proposal","Create an SOP","Build a client onboarding document"], method:"Act as a business documentation specialist. Turn rough information into clear, professional, logically structured documents. Ask for jurisdiction and recommend qualified legal review when a document has legal consequences. Never claim to provide legal advice or invent contractual facts." },
  { id:"phoebe", name:"Phoebe the Photo Director", role:"Photo Creative", category:"Creative", color:"#64dfc0", description:"Plans product photos, edits, retouching directions, and high-quality prompts for consistent branded imagery.", tasks:["Create a product photo concept","Write a photo-editing brief","Build a branded photoshoot plan"], method:"Act as a commercial photography and photo-editing director. Specify framing, subject placement, lens feel, lighting, background, styling, color grade, retouching limits, aspect ratio, and negative prompts. Preserve product accuracy and a person's identity when requested." },
  { id:"wendy", name:"Wendy the Web Architect", role:"Websites & Landing Pages", category:"Creative", color:"#4ed0df", description:"Plans conversion-focused websites and landing pages with structure, copy, calls to action, and mobile UX.", tasks:["Plan a landing page","Create a website structure","Audit my website"], method:"Act as a UX strategist, conversion copywriter, and web architect. Produce a mobile-first page structure with sections, copy direction, CTA hierarchy, trust elements, forms, SEO basics, accessibility notes, and build requirements. Keep the experience simple and aligned with the campaign goal." },
  { id:"parker", name:"Parker the Prompt Engineer", role:"AI Prompt Systems", category:"Operations", color:"#7ddd58", description:"Builds reusable, reliable prompts and AI workflows for marketing, operations, research, and content production.", tasks:["Build a reusable AI prompt","Improve my existing prompt","Design a multi-step AI workflow"], method:"Act as a prompt engineer. Define the objective, inputs, constraints, context, process, output format, quality checks, and failure handling. Produce a reusable prompt with placeholders, a short usage guide, and one realistic test case. Avoid unnecessary complexity." },
  { id:"ava", name:"Ava the Audience Decoder", role:"Customer Avatar Research", category:"Research", color:"#c89057", description:"Builds evidence-aware customer profiles using pains, desires, triggers, objections, language, and buying behavior.", tasks:["Create a customer avatar","Map customer objections","Build a buyer-message matrix"], method:"Act as a customer insight strategist. Build a practical audience profile covering situation, goals, pains, emotions, triggers, objections, decision criteria, trusted channels, and likely customer language. Clearly label hypotheses that require interviews, surveys, or live research." },
  { id:"drew", name:"Drew the DM Converter", role:"DM Sales Conversations", category:"Sales", color:"#f06fa8", description:"Writes natural direct-message conversations that qualify prospects and move them toward the appropriate next step.", tasks:["Write a DM reply flow","Create a lead qualification script","Handle a difficult DM objection"], method:"Act as a conversational selling specialist. Write short, human, platform-appropriate messages that establish relevance, ask permission, diagnose needs, qualify fit, address objections, and suggest a clear next step. Do not use spam, manipulation, fake familiarity, or unsupported promises." },
  { id:"arlo", name:"Arlo the Acquisition Advisor", role:"Customer Acquisition", category:"Strategy", color:"#f0a54a", description:"Designs practical systems for attracting qualified customers across organic, paid, referral, and partnership channels.", tasks:["Create an acquisition plan","Choose my best growth channels","Lower customer acquisition cost"], method:"Act as a customer acquisition advisor. Match channels to economics, audience behavior, capabilities, and budget. Map acquisition loops, required assets, experiments, measurement, payback considerations, risks, and a 30-day priority plan. Never invent benchmark data." },
  { id:"iris", name:"Iris the Systems Coach", role:"Habits & Productivity", category:"Operations", color:"#d49a61", description:"Turns ambitious business goals into sustainable routines, operating rhythms, scorecards, and accountability systems.", tasks:["Build a productive weekly system","Turn my goal into daily habits","Create an accountability scorecard"], method:"Act as a practical business productivity coach. Translate the goal into controllable behaviors, triggers, environment design, time blocks, minimum viable habits, review rhythms, and simple measurement. Adapt to the user's real schedule and avoid motivational clichés." },
  { id:"andre", name:"Andre the Agency Builder", role:"Agency Growth", category:"Strategy", color:"#4f89d8", description:"Helps package services, price retainers, create delivery systems, and grow a sustainable freelance or agency business.", tasks:["Design my service packages","Build an agency launch plan","Create a client delivery system"], method:"Act as an experienced service-business operator. Help define niche, positioning, offer, scope, pricing logic, acquisition, sales process, onboarding, delivery, retention, capacity, and KPIs. Favor profitable, repeatable systems and make financial assumptions explicit." }
];

const categories = ["All", ...new Set(agents.map(a => a.category))];
const profileKey = "mao-ai-team-profile-v1";
let profile = JSON.parse(localStorage.getItem(profileKey) || "{}");
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
  filters.innerHTML = categories.map(c => `<button class="filter ${c === activeCategory ? "active" : ""}" data-category="${c}">${c}${c === "All" ? ` · ${agents.length}` : ""}</button>`).join("");
}

function renderAgents() {
  const term = searchInput.value.trim().toLowerCase();
  const visible = agents.filter(a => (activeCategory === "All" || a.category === activeCategory) && [a.name,a.role,a.category,a.description,...a.tasks].join(" ").toLowerCase().includes(term));
  teamGrid.innerHTML = visible.map(a => `
    <article class="agent-card" style="--agent:${a.color}" data-agent="${a.id}" tabindex="0" aria-label="Open ${a.name}">
      <div class="agent-top"><span class="tag">${a.category}</span>${botMarkup()}</div>
      <div class="agent-info"><span class="agent-role">${a.role}</span><h3>${a.name}</h3><p>${a.description}</p><div class="card-actions"><button class="choose-task" data-options="${a.id}">Choose task</button><button class="quick-start" data-quick="${a.id}">Start now <span>↗</span></button></div></div>
    </article>`).join("");
  emptyState.hidden = visible.length > 0;
}

function updateProfileUI() {
  document.querySelector("#businessChipText").textContent = profile.brandName || "Add your business profile";
  [...profileForm.elements].forEach(el => { if (el.name) el.value = profile[el.name] || ""; });
}

function openAgent(id) {
  activeAgent = agents.find(a => a.id === id);
  selectedTask = activeAgent.tasks[0];
  const content = document.querySelector("#agentModalContent");
  content.style.setProperty("--agent", activeAgent.color);
  content.innerHTML = `
    <div class="agent-modal-header">${botMarkup()}<span class="agent-role">${activeAgent.role}</span><h2>${activeAgent.name}</h2><p>${activeAgent.description}</p></div>
    <div class="agent-modal-body">
      ${profile.brandName ? "" : `<div class="profile-warning">Tip: Set up your business profile first for more personalized results.</div>`}
      <h3>What should ${activeAgent.name.split(" ")[0]} work on?</h3>
      <div class="task-chips">${activeAgent.tasks.map((t,i) => `<button class="task-chip ${i===0?"selected":""}" data-task="${t}">${t}</button>`).join("")}</div>
      <textarea id="customTask" class="task-input" rows="3" placeholder="Or describe a different marketing task..."></textarea>
      <div class="launch-actions"><button class="primary-button" id="launchAgent">Copy brief & open ChatGPT ↗</button><button class="copy-button" id="copyAgent">Copy only</button></div>
    </div>`;
  agentDialog.showModal();
}

function createPrompt(taskOverride = "") {
  const custom = document.querySelector("#customTask")?.value.trim();
  const task = taskOverride || custom || selectedTask;
  const context = profile.brandName ? `\nBUSINESS PROFILE\n- Brand: ${profile.brandName}\n- Industry: ${profile.industry || "Not provided"}\n- Products/services: ${profile.offer || "Not provided"}\n- Ideal customers: ${profile.audience || "Not provided"}\n- Brand voice: ${profile.voice || "Not provided"}\n- Location/market: ${profile.market || "Not provided"}\n- Main goal: ${profile.goal || "Not provided"}\n- Primary channels: ${profile.channels || "Not provided"}` : "\nBUSINESS PROFILE\nNo profile has been provided yet. Ask me only for the information essential to complete the task.";
  return `You are ${activeAgent.name}, my dedicated ${activeAgent.role} specialist.\n\nYOUR METHOD\n${activeAgent.method}\n${context}\n\nTODAY'S TASK\n${task}\n\nWORKING RULES\n1. Start by confirming what you understand.\n2. Ask no more than five focused questions, and only if the missing answers would materially change the work.\n3. Then produce a complete, usable deliverable—not just advice.\n4. Use clear headings and concise language.\n5. Mark assumptions and anything that needs fact-checking.\n6. Finish with the three most important next actions.\n\nBegin now.`;
}

async function copyPrompt() {
  const prompt = createPrompt();
  try { await navigator.clipboard.writeText(prompt); showToast("Specialist brief copied"); }
  catch { showToast("Select and copy the brief manually in ChatGPT"); }
  return prompt;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

filters.addEventListener("click", e => {
  const button = e.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters(); renderAgents();
});
teamGrid.addEventListener("click", e => {
  const quick = e.target.closest("[data-quick]");
  if (quick) {
    activeAgent = agents.find(a => a.id === quick.dataset.quick);
    selectedTask = "";
    const prompt = createPrompt(`Start a guided ${activeAgent.role} work session. Briefly introduce what you can help with, offer three relevant task options, and ask me to choose one or describe my own task.`);
    navigator.clipboard?.writeText(prompt).catch(() => {});
    window.open(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`, "_blank", "noopener,noreferrer");
    showToast(`${activeAgent.name.split(" ")[0]} is starting in ChatGPT`);
    return;
  }
  const options = e.target.closest("[data-options]");
  const card = e.target.closest("[data-agent]");
  if (options) openAgent(options.dataset.options);
  else if (card) openAgent(card.dataset.agent);
});
teamGrid.addEventListener("keydown", e => { if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-agent]")) openAgent(e.target.dataset.agent); });
searchInput.addEventListener("input", renderAgents);
document.addEventListener("keydown", e => { if(e.key==="/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();searchInput.focus();} });
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
    guide.innerHTML = `<div class="notice"><span>✓</span><p><strong>Already installed.</strong> You are using the full-screen app version.</p></div>`;
    return;
  }
  if (deferredInstallPrompt) {
    guide.innerHTML = `<div class="install-step"><span>1</span><div><strong>Tap the button below</strong><p>Your phone will confirm installation and add the app to your home screen.</p></div></div><button class="primary-button native-install" id="nativeInstall">Install Mao's AI Team</button>`;
    return;
  }
  if (isIos) {
    guide.innerHTML = `<div class="install-step"><span>1</span><div><strong>Open this page in Safari</strong><p>The Add to Home Screen option is available from Safari.</p></div></div><div class="install-step"><span>2</span><div><strong>Tap the Share button</strong><p>It is the square icon with an upward arrow.</p></div></div><div class="install-step"><span>3</span><div><strong>Select “Add to Home Screen”</strong><p>Confirm by tapping Add. The app icon will appear on your iPhone.</p></div></div>`;
  } else {
    guide.innerHTML = `<div class="install-step"><span>1</span><div><strong>Open your browser menu</strong><p>In Chrome, tap the three-dot menu.</p></div></div><div class="install-step"><span>2</span><div><strong>Select “Install app”</strong><p>Some phones label this “Add to Home screen.”</p></div></div><div class="install-step"><span>3</span><div><strong>Confirm installation</strong><p>The app icon will appear with your other apps.</p></div></div>`;
  }
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  renderInstallGuide();
});

installButton.addEventListener("click", () => { renderInstallGuide(); installDialog.showModal(); });
installDialog.addEventListener("click", async event => {
  if (event.target.id !== "nativeInstall" || !deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installDialog.close();
});
document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => document.querySelector(`#${b.dataset.close}`).close()));
[profileDialog,agentDialog,howDialog,installDialog].forEach(d => d.addEventListener("click", e => { if(e.target===d) d.close(); }));

profileForm.addEventListener("submit", e => {
  e.preventDefault();
  profile = Object.fromEntries(new FormData(profileForm).entries());
  localStorage.setItem(profileKey, JSON.stringify(profile));
  updateProfileUI(); profileDialog.close(); showToast("Business profile saved");
});
document.querySelector("#clearProfile").addEventListener("click", () => {
  profile = {}; localStorage.removeItem(profileKey); profileForm.reset(); updateProfileUI(); showToast("Business profile cleared");
});
agentDialog.addEventListener("click", async e => {
  const task = e.target.closest("[data-task]");
  if(task){ selectedTask=task.dataset.task; document.querySelectorAll(".task-chip").forEach(b=>b.classList.toggle("selected",b===task)); document.querySelector("#customTask").value=""; }
  if(e.target.id === "copyAgent") await copyPrompt();
  if(e.target.id === "launchAgent") {
    const prompt = createPrompt();
    navigator.clipboard?.writeText(prompt).catch(() => {});
    const shortPrompt = prompt.length > 6000 ? `I have copied a specialist marketing brief to my clipboard. Ask me to paste it.` : prompt;
    window.open(`https://chatgpt.com/?q=${encodeURIComponent(shortPrompt)}`, "_blank", "noopener,noreferrer");
    showToast("Opening specialist in ChatGPT");
  }
});

updateProfileUI();
renderFilters();
renderAgents();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}
