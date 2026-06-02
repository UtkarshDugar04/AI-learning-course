// app.js

const STORAGE_KEY = "neuron-cockpit-v1";

function getInitialState() {
  const defaults = {
    lessonsCompleted: [],
    categories: [{ id: 'cat_general', name: 'General', isExpanded: true }],
    stickies: [],
    currentModuleId: null
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    
    if (typeof parsed.notes === 'string') {
      parsed.stickies = [];
      parsed.categories = defaults.categories;
      if (parsed.notes.trim()) {
        parsed.stickies.push({
          id: 'note_' + Date.now(),
          categoryId: 'cat_general',
          text: parsed.notes,
          color: 'bg-fj-yellow',
          timestamp: Date.now()
        });
      }
      delete parsed.notes;
    }
    
    return { ...defaults, ...parsed };
  } catch (e) {
    return defaults;
  }
}

const STATE = {
  page: "dashboard",
  data: getInitialState()
};

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE.data));
}

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// ─── ROUTING ──────────────────────────────────────────

window.toggleSidebar = function() {
  document.getElementById('sidebar').classList.toggle('open');
}

function navigate(page, payload = null) {
  STATE.page = page;
  
  if (page === "module" && payload) {
    STATE.data.currentModuleId = payload;
    saveState();
  }

  // Update Sidebar
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  const activeNav = document.getElementById(`nav-${page === "module" ? "roadmap" : page}`);
  if (activeNav) activeNav.classList.add("active");

  // Close sidebar on mobile after navigating
  document.getElementById('sidebar').classList.remove('open');

  const content = document.getElementById("content");
  
  switch(page) {
    case "dashboard": renderDashboard(content); break;
    case "roadmap": renderRoadmap(content); break;
    case "module": renderModule(content, STATE.data.currentModuleId); break;
    case "graph": renderGraph(content); break;
    case "hub": renderHub(content); break;
    case "projects": renderProjects(content); break;
    case "notes": renderNotes(content); break;
    default: renderDashboard(content); break;
  }
}

// ─── VIEWS ────────────────────────────────────────────

function renderDashboard(container) {
  document.getElementById("topbar-content").innerText = "Dashboard";
  
  const totalLessons = Object.values(DATA.modules).reduce((sum, mod) => sum + (mod.resources ? 1 : 0), 0) + 13; // rough estimate
  const completed = STATE.data.lessonsCompleted.length;
  const currMod = STATE.data.currentModuleId ? DATA.modules[STATE.data.currentModuleId] : null;

  // Grab a random recall prompt
  const randomRecall = DATA.activeRecallBank[Math.floor(Math.random() * DATA.activeRecallBank.length)];

  container.innerHTML = `
    <h1>Welcome back.</h1>
    <p>Your personal AI learning workspace.</p>

    <div class="flex gap-4 mb-6" style="margin-top: 32px">
      <div class="card flex-col" style="flex:1;">
        <h3 style="color:var(--text-muted); font-size:12px; text-transform:uppercase;">Current Progress</h3>
        <div style="font-size:24px; font-weight:600; margin-bottom:8px;">${completed} lessons completed</div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${Math.min(100, (completed/13)*100)}%;"></div>
        </div>
      </div>
      <div class="card flex-col" style="flex:1;">
        <h3 style="color:var(--text-muted); font-size:12px; text-transform:uppercase;">Continue Learning</h3>
        <div style="font-size:16px; font-weight:500; margin-bottom:8px;">${currMod ? escapeHTML(currMod.title) : 'Start with Week 1'}</div>
        <button class="primary" onclick="navigate('${currMod ? 'module' : 'roadmap'}', '${currMod ? currMod.id : ''}')" style="align-self:flex-start;">Jump Back In</button>
      </div>
    </div>

    <div class="card">
      <h3 style="color:var(--text-muted); font-size:12px; text-transform:uppercase;">Active Recall Nudge</h3>
      <div class="recall-block">
        <div class="recall-prompt">${escapeHTML(randomRecall.prompt)}</div>
        <div style="font-size:13px; color:var(--text-secondary);">Concept: ${escapeHTML(randomRecall.concept)}</div>
      </div>
    </div>
  `;
}

function renderRoadmap(container) {
  document.getElementById("topbar-content").innerText = "Learning Roadmap";
  
  let html = `<h1>4-Week Roadmap</h1><p>Your path to understanding AI systems.</p>`;
  
  DATA.weeks.forEach(week => {
    html += `<div class="card mb-4">
      <div class="card-title">${escapeHTML(week.title)}</div>
      <div class="card-meta">${escapeHTML(week.theme)} • ${escapeHTML(week.duration)}</div>
      <div class="flex flex-col gap-2 mt-4">`;
      
    week.modules.forEach(modId => {
      const mod = DATA.modules[modId];
      if (!mod) return;
      const isDone = STATE.data.lessonsCompleted.includes(modId);
      html += `
        <div class="flex justify-between items-center" style="padding:12px; background:var(--bg-hover); border-radius:var(--radius-md); border:1px solid var(--border-light);">
          <div>
            <div style="font-weight:500; font-size:14px; color:${isDone ? 'var(--text-muted)' : 'var(--text-primary)'}">${escapeHTML(mod.title)}</div>
            <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${escapeHTML(mod.duration)} • ${mod.resources.length} resources</div>
          </div>
          <button onclick="navigate('module', '${modId}')">${isDone ? 'Review' : 'Start'}</button>
        </div>
      `;
    });
    
    html += `</div></div>`;
  });
  
  container.innerHTML = html;
}

function renderModule(container, modId) {
  const mod = DATA.modules[modId];
  if (!mod) return navigate('roadmap');

  document.getElementById("topbar-content").innerText = `Roadmap / ${mod.title}`;
  const isDone = STATE.data.lessonsCompleted.includes(modId);

  let html = `
    <button onclick="navigate('roadmap')" style="margin-bottom:24px; background:transparent; border:none; color:var(--text-secondary); padding:0;">← Back to Roadmap</button>
    <h1>${escapeHTML(mod.title)}</h1>
    <div class="card-meta mb-6">${escapeHTML(mod.duration)} • ${escapeHTML(mod.concepts.join(', '))}</div>
    
    <div class="card mb-6" style="border-left: 3px solid var(--brand-color);">
      <h3 style="font-size:14px; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px;">Why this matters</h3>
      <p style="margin:0; color:var(--text-primary);">${escapeHTML(mod.objective)}</p>
    </div>
    
    <h3 class="mb-4">Resources</h3>
    <div class="flex flex-col gap-3 mb-6">
  `;

  mod.resources.forEach(r => {
    html += `
      <div class="card" style="margin:0; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-weight:500; margin-bottom:4px;">${escapeHTML(r.title)}</div>
          <div style="font-size:12px; color:var(--text-muted); text-transform:capitalize;">${r.type} • ${escapeHTML(r.duration)}</div>
        </div>
        <a href="${escapeHTML(r.url)}" target="_blank" rel="noopener noreferrer">
          <button>Open</button>
        </a>
      </div>
    `;
  });

  html += `
    </div>
    <div class="flex justify-between items-center" style="margin-top:48px; padding-top:24px; border-top:1px solid var(--border-light);">
      <div style="color:var(--text-secondary); font-size:14px;">Mark this module as complete to update your progress.</div>
      <button class="${isDone ? '' : 'primary'}" id="btn-complete-mod">${isDone ? 'Completed ✓' : 'Mark as Complete'}</button>
    </div>
  `;

  container.innerHTML = html;

  document.getElementById('btn-complete-mod').addEventListener('click', () => {
    if (!STATE.data.lessonsCompleted.includes(modId)) {
      STATE.data.lessonsCompleted.push(modId);
      saveState();
      navigate('module', modId);
    } else {
      STATE.data.lessonsCompleted = STATE.data.lessonsCompleted.filter(id => id !== modId);
      saveState();
      navigate('module', modId);
    }
  });
}

function renderGraph(container) {
  document.getElementById("topbar-content").innerText = "Knowledge Graph";
  container.innerHTML = `
    <h1>Knowledge Graph</h1>
    <p>Interactive concept map showing relationships across the AI landscape.</p>
    <div id="graph-container">
      <canvas id="kg-canvas"></canvas>
    </div>
  `;
  
  // Simple custom canvas implementation for zero-dependency
  const canvas = document.getElementById("kg-canvas");
  const ctx = canvas.getContext("2d");
  const parent = document.getElementById("graph-container");
  
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;

  const nodes = [
    { id: "ml", label: "Machine Learning", x: 100, y: 250 },
    { id: "dl", label: "Deep Learning", x: 250, y: 250 },
    { id: "nn", label: "Neural Networks", x: 250, y: 150 },
    { id: "tx", label: "Transformers", x: 400, y: 250 },
    { id: "attn", label: "Attention", x: 400, y: 150 },
    { id: "llm", label: "LLMs", x: 550, y: 250 },
    { id: "rag", label: "RAG", x: 550, y: 150 },
    { id: "agent", label: "Agents", x: 700, y: 250 },
  ];

  const edges = [
    { from: "ml", to: "dl" },
    { from: "dl", to: "nn" },
    { from: "dl", to: "tx" },
    { from: "tx", to: "attn" },
    { from: "tx", to: "llm" },
    { from: "llm", to: "rag" },
    { from: "llm", to: "agent" }
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw edges
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 1;
    edges.forEach(e => {
      const p1 = nodes.find(n => n.id === e.from);
      const p2 = nodes.find(n => n.id === e.to);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(n => {
      ctx.fillStyle = "#1c1c1c";
      ctx.strokeStyle = "#5e6ad2";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = "#f0f0f0";
      ctx.font = "12px sans-serif";
      ctx.fillText(n.label, n.x + 15, n.y + 4);
    });
  }
  
  draw();
}

function renderHub(container) {
  document.getElementById("topbar-content").innerText = "Intelligence Hub";
  
  let html = `<h1>Intelligence Hub</h1><p>Curated signals from researchers, founders, and operators.</p>`;
  
  const categories = Object.keys(DATA.intelligenceHub);
  categories.forEach(cat => {
    html += `<h2 style="text-transform:capitalize;">${cat}</h2><div class="flex flex-col gap-3">`;
    DATA.intelligenceHub[cat].forEach(item => {
      html += `
        <div class="card" style="margin:0;">
          <div class="flex justify-between items-center mb-2">
            <div style="font-weight:600; font-size:16px;">${escapeHTML(item.name)}</div>
            <div style="font-size:11px; text-transform:uppercase; color:var(--brand-color); border:1px solid var(--brand-color); padding:2px 6px; border-radius:4px;">${escapeHTML(item.level)}</div>
          </div>
          <div style="font-size:13px; color:var(--text-primary); margin-bottom:8px;"><strong>Why follow:</strong> ${escapeHTML(item.why)}</div>
          <div style="font-size:13px; color:var(--text-secondary); margin-bottom:4px;"><strong>Best for:</strong> ${escapeHTML(item.bestFor)}</div>
          <div style="font-size:13px; color:var(--text-muted);">${escapeHTML(item.summary)}</div>
        </div>
      `;
    });
    html += `</div>`;
  });

  container.innerHTML = html;
}

function renderProjects(container) {
  document.getElementById("topbar-content").innerText = "Project Studio";
  let html = `<h1>Weekly Projects</h1><p>Concrete deliverables to test your mental models.</p><div class="flex flex-col gap-4 mt-6">`;
  
  DATA.projects.forEach(p => {
    html += `
      <div class="card">
        <div class="card-meta" style="text-transform:uppercase; color:var(--brand-color);">${escapeHTML(p.week)}</div>
        <div class="card-title">${escapeHTML(p.title)}</div>
        <p style="color:var(--text-primary); margin-top:8px;"><strong>Goal:</strong> ${escapeHTML(p.goal)}</p>
        <p style="margin-bottom:8px;"><strong>Deliverable:</strong> ${escapeHTML(p.deliverable)}</p>
        <div style="font-size:12px; color:var(--text-muted);"><strong>Resources:</strong> ${escapeHTML(p.resources)}</div>
      </div>
    `;
  });
  
  html += `</div>`;
  container.innerHTML = html;
}

const STICKY_COLORS = [
  'bg-fj-yellow', 'bg-fj-orange', 'bg-fj-red', 'bg-fj-pink',
  'bg-fj-purple', 'bg-fj-violet', 'bg-fj-indigo', 'bg-fj-blue',
  'bg-fj-cyan', 'bg-fj-teal', 'bg-fj-mint', 'bg-fj-green',
  'bg-fj-lime', 'bg-fj-stone', 'bg-fj-gray', 'bg-fj-dark'
];

let composerState = { color: 'bg-fj-yellow', categoryId: 'cat_general' };
let editingNoteId = null;

function renderNotes(container) {
  document.getElementById("topbar-content").innerText = "Personal Notes";

  // Ensure General category exists
  if (!STATE.data.categories || STATE.data.categories.length === 0) {
    STATE.data.categories = [{ id: 'cat_general', name: 'General', isExpanded: true }];
  }
  if (!STATE.data.stickies) STATE.data.stickies = [];

  // Check if composer category still exists, else default
  if (!STATE.data.categories.find(c => c.id === composerState.categoryId)) {
    composerState.categoryId = STATE.data.categories[0].id;
  }

  let html = `
    <h1>Workspace Notes</h1>
    <p>Capture your mental models. Hit Enter to save a new sticky note.</p>
    
    <!-- Composer -->
    <div id="note-composer">
      <div class="color-picker" id="composer-colors">
        ${STICKY_COLORS.map(c => `<div class="color-swatch ${c} ${composerState.color === c ? 'selected' : ''}" onclick="setComposerColor('${c}')"></div>`).join('')}
      </div>
      <textarea id="composer-input" placeholder="Type a note and hit Enter to save..." style="min-height: 80px; margin-bottom: 8px;"></textarea>
      <div class="flex justify-between items-center">
        <select id="composer-category" style="background:var(--bg-app); color:var(--text-primary); border:1px solid var(--border-light); border-radius:4px; padding:4px 8px;" onchange="composerState.categoryId = this.value">
          ${STATE.data.categories.map(cat => `<option value="${cat.id}" ${composerState.categoryId === cat.id ? 'selected' : ''}>${escapeHTML(cat.name)}</option>`).join('')}
        </select>
        <button class="primary" onclick="saveNewSticky()">Save Note (Enter)</button>
      </div>
    </div>

    <!-- Category Manager -->
    <div class="flex items-center gap-2 mb-6">
      <input type="text" id="new-category-input" placeholder="New Category Name..." style="background:var(--bg-app); color:var(--text-primary); border:1px solid var(--border-light); padding:6px 10px; border-radius:4px; font-size:13px;" />
      <button onclick="addCategory()">Add Category</button>
    </div>

    <!-- Stickies List -->
    <div id="stickies-container">
  `;

  STATE.data.categories.forEach(cat => {
    const catStickies = STATE.data.stickies.filter(s => s.categoryId === cat.id);
    html += `
      <div class="category-section">
        <div class="category-header" onclick="toggleCategory('${cat.id}')">
          <span>${escapeHTML(cat.name)} <span style="color:var(--text-muted); font-size:12px; margin-left:8px;">(${catStickies.length})</span></span>
          <span>${cat.isExpanded ? '▼' : '▶'}</span>
        </div>
        ${cat.isExpanded ? `
          <div class="category-content">
            ${catStickies.map(s => renderStickyNote(s)).join('')}
          </div>
        ` : ''}
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;

  // Add Enter listener to composer
  const composerInput = document.getElementById("composer-input");
  if (composerInput) {
    composerInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveNewSticky();
      }
    });
  }
}

function renderStickyNote(note) {
  if (editingNoteId === note.id) {
    // Edit Mode
    return `
      <div class="sticky-note ${note.color}" style="box-shadow: 0 0 0 2px #fff;">
        <div class="color-picker" style="margin-bottom:8px;">
          ${STICKY_COLORS.map(c => `<div class="color-swatch ${c} ${note.color === c ? 'selected' : ''}" onclick="updateNoteColor('${note.id}', '${c}')" style="width:16px; height:16px;"></div>`).join('')}
        </div>
        <textarea id="edit-input-${note.id}" style="min-height:80px; margin-bottom:8px; background:rgba(255,255,255,0.1); color:inherit; border:1px solid rgba(0,0,0,0.2);">${escapeHTML(note.text)}</textarea>
        <div class="flex justify-between items-center">
          <select id="edit-cat-${note.id}" style="background:rgba(255,255,255,0.2); color:inherit; border:none; border-radius:4px; padding:2px;">
            ${STATE.data.categories.map(cat => `<option value="${cat.id}" ${note.categoryId === cat.id ? 'selected' : ''} style="color:#000;">${escapeHTML(cat.name)}</option>`).join('')}
          </select>
          <div class="flex gap-2">
            <button class="sticky-btn" onclick="deleteSticky('${note.id}')">Delete</button>
            <button class="sticky-btn" style="background:#111; color:#fff;" onclick="saveEdit('${note.id}')">Save</button>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="sticky-note ${note.color}">
      <div class="sticky-actions">
        <button class="sticky-btn" onclick="startEdit('${note.id}')">Edit</button>
      </div>
      <div>${escapeHTML(note.text)}</div>
      <div style="font-size:10px; opacity:0.6; margin-top:12px; text-align:right;">
        ${new Date(note.timestamp).toLocaleDateString()}
      </div>
    </div>
  `;
}

// Global UI actions
window.setComposerColor = function(color) {
  composerState.color = color;
  navigate("notes");
}

window.saveNewSticky = function() {
  const input = document.getElementById("composer-input");
  const text = input.value.trim();
  if (!text) return;
  
  STATE.data.stickies.push({
    id: 'note_' + Date.now(),
    categoryId: composerState.categoryId,
    text: text,
    color: composerState.color,
    timestamp: Date.now()
  });
  saveState();
  
  // Ensure the target category is expanded so user sees the new note
  const cat = STATE.data.categories.find(c => c.id === composerState.categoryId);
  if (cat && !cat.isExpanded) cat.isExpanded = true;
  
  navigate("notes");
}

window.startEdit = function(id) {
  editingNoteId = id;
  navigate("notes");
}

window.saveEdit = function(id) {
  const note = STATE.data.stickies.find(s => s.id === id);
  if (note) {
    const textInput = document.getElementById(`edit-input-${id}`);
    const catSelect = document.getElementById(`edit-cat-${id}`);
    note.text = textInput.value.trim();
    note.categoryId = catSelect.value;
  }
  editingNoteId = null;
  saveState();
  navigate("notes");
}

window.updateNoteColor = function(id, color) {
  const note = STATE.data.stickies.find(s => s.id === id);
  if (note) note.color = color;
  saveState();
  navigate("notes");
}

window.deleteSticky = function(id) {
  if (confirm("Delete this note?")) {
    STATE.data.stickies = STATE.data.stickies.filter(s => s.id !== id);
    editingNoteId = null;
    saveState();
    navigate("notes");
  }
}

window.addCategory = function() {
  const input = document.getElementById("new-category-input");
  const name = input.value.trim();
  if (!name) return;
  STATE.data.categories.push({ id: 'cat_' + Date.now(), name: name, isExpanded: true });
  saveState();
  navigate("notes");
}

window.toggleCategory = function(id) {
  const cat = STATE.data.categories.find(c => c.id === id);
  if (cat) cat.isExpanded = !cat.isExpanded;
  saveState();
  navigate("notes");
}

// ─── AUTHENTICATION ────────────────────────────────────────

window.checkAuth = function() {
  const pwd = document.getElementById("auth-password").value;
  if (pwd === "LOSER") {
    sessionStorage.setItem("site_auth", "true");
    const overlay = document.getElementById("auth-overlay");
    if (overlay) overlay.style.display = "none";
  } else {
    const errorEl = document.getElementById("auth-error");
    if (errorEl) errorEl.style.display = "block";
  }
}

// ─── INIT ──────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("site_auth") === "true") {
    const overlay = document.getElementById("auth-overlay");
    if (overlay) overlay.style.display = "none";
  }
  navigate(STATE.page);
});
