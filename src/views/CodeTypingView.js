/**
 * TypeForge Code Typing View — Mode C
 * Language Overview · Level Map · Interactive Code Challenge Runner
 * Fully redesigned with working learning screen + next-level navigation
 */
import { createTypingWidget } from "../components/TypingWidget.js";
import { createVirtualKeyboard } from "../components/VirtualKeyboard.js";
import { LANGUAGES, CODE_CURRICULUM } from "../data/codeCurriculum.js";
import { executeCode } from "../engine/codeRunner.js";
import { storage } from "../services/storage.js";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Language Overview Page ─────────────────────────────────────────────────
export function createCodeTypingOverview(router) {
  const page = document.createElement("div");
  page.className = "code-overview-page";

  page.innerHTML = `
    <div class="code-overview-inner">
      <div class="code-overview-hero">
        <div class="co-badge">🎓 Structured Curriculum</div>
        <h1 class="co-title">Code Learning Path</h1>
        <p class="co-subtitle">
          Type real code. Understand every line. Build real projects.
          Each language has a full syllabus from basics to a capstone project.
        </p>
        <div class="co-stats-row">
          <span class="co-stat"><strong>${LANGUAGES.length}</strong> Languages</span>
          <span class="co-stat-div">·</span>
          <span class="co-stat"><strong>${LANGUAGES.reduce((a, l) => a + l.levelsCount, 0)}</strong> Chapters</span>
          <span class="co-stat-div">·</span>
          <span class="co-stat"><strong>Free</strong> Forever</span>
        </div>
      </div>

      <div class="languages-grid" id="lang-grid"></div>
    </div>
  `;

  const grid = page.querySelector("#lang-grid");
  LANGUAGES.forEach(lang => {
    const unlocked = storage.getUnlockedLevel(lang.id);
    const pct = Math.min(100, ((unlocked - 1) / lang.levelsCount) * 100);
    const card = document.createElement("div");
    card.className = "lang-card-v2";
    card.innerHTML = `
      <div class="lcv2-header">
        <div class="lcv2-icon" style="background:${lang.bg};color:${lang.color};border-color:${lang.color}30">
          <span class="lcv2-icon-text">${lang.icon}</span>
        </div>
        <div class="lcv2-badge">${lang.levelsCount} chapters</div>
      </div>
      <h3 class="lcv2-name">${lang.name}</h3>
      <p class="lcv2-desc">${lang.description}</p>
      <div class="lcv2-progress">
        <div class="lcv2-progress-bar">
          <div class="lcv2-progress-fill" style="width:${pct}%;background:${lang.color}"></div>
        </div>
        <span class="lcv2-progress-label">${unlocked - 1}/${lang.levelsCount} complete</span>
      </div>
      <div class="lcv2-cta" style="border-color:${lang.color}30">
        ${unlocked > 1 ? `<span class="lcv2-resume">↩ Resume</span>` : `<span class="lcv2-start">Start →</span>`}
      </div>
    `;
    card.addEventListener("click", () => router.navigate(`/code-typing/${lang.id}`));
    grid.appendChild(card);
  });

  return page;
}

// ─── Language Level Map Page ─────────────────────────────────────────────────
export function createLevelMapView(router, langId) {
  const page = document.createElement("div");
  page.className = "level-map-page";

  const langMeta = LANGUAGES.find(l => l.id === langId);
  const curriculum = CODE_CURRICULUM[langId];
  const unlockedLevel = storage.getUnlockedLevel(langId);

  if (!langMeta || !curriculum) {
    page.innerHTML = `<div style="text-align:center;padding:4rem;color:var(--color-text-secondary)">
      <h2>Language not found</h2>
      <button class="btn btn-secondary" id="back-btn" style="margin-top:1rem">← Back</button>
    </div>`;
    page.querySelector("#back-btn").addEventListener("click", () => router.navigate("/code-typing"));
    return page;
  }

  const totalChallenges = curriculum.levels.reduce((a, l) => a + l.challenges.length, 0);
  const completedLevels = unlockedLevel - 1;

  page.innerHTML = `
    <div class="lm-inner">
      <div class="lm-header">
        <button class="btn btn-ghost lm-back" id="back-btn">← All Languages</button>
        <div class="lm-lang-badge" style="background:${langMeta.bg};color:${langMeta.color};border-color:${langMeta.color}40">
          ${langMeta.icon}
        </div>
        <div>
          <h1 class="lm-title">${langMeta.name} Curriculum</h1>
          <p class="lm-meta">${langMeta.levelsCount} chapters · ${totalChallenges} challenges · ${completedLevels} completed</p>
        </div>
      </div>

      <div class="lm-overall-progress">
        <div class="lm-prog-bar">
          <div class="lm-prog-fill" style="width:${Math.min(100, (completedLevels / langMeta.levelsCount) * 100)}%;background:${langMeta.color}"></div>
        </div>
        <span class="lm-prog-label">${completedLevels} / ${langMeta.levelsCount} chapters complete</span>
      </div>

      <div class="level-map-list">
        ${curriculum.levels.map((level, idx) => {
          const isLocked = level.id > unlockedLevel;
          const isCompleted = level.id < unlockedLevel;
          const isCurrent = level.id === unlockedLevel;
          const isProject = idx === curriculum.levels.length - 1;
          return `
            <div class="lm-row ${isLocked ? "lm-locked" : ""} ${isCurrent ? "lm-current" : ""} ${isCompleted ? "lm-done" : ""}"
                 data-level="${level.id}" style="cursor:${isLocked ? "not-allowed" : "pointer"}">
              <div class="lm-row-left">
                <div class="lm-num ${isCompleted ? "lm-num-done" : ""} ${isCurrent ? "lm-num-current" : ""}">
                  ${isCompleted ? "✓" : level.id}
                </div>
                <div class="lm-row-info">
                  <div class="lm-row-title">
                    ${isProject ? `<span class="lm-project-tag">🏆 Project</span>` : ""}
                    ${level.title}
                  </div>
                  <div class="lm-row-meta">${level.challenges.length} challenge${level.challenges.length !== 1 ? "s" : ""} · ${level.description}</div>
                </div>
              </div>
              <div class="lm-row-right">
                ${isCompleted ? `<span class="lm-status-done">✅ Done</span>` : ""}
                ${isLocked ? `<span class="lm-status-locked">🔒 Locked</span>` : ""}
                ${isCurrent ? `<span class="lm-status-start">▶ Continue</span>` : ""}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;

  page.querySelector("#back-btn").addEventListener("click", () => router.navigate("/code-typing"));

  page.querySelectorAll(".lm-row:not(.lm-locked)").forEach(row => {
    row.addEventListener("click", () => {
      router.navigate(`/code-typing/${langId}/level/${row.dataset.level}/challenge/0`);
    });
  });

  return page;
}

// ─── Code Challenge Runner ───────────────────────────────────────────────────
export function createCodeChallengeView(router, langId, levelId, challengeIndex = 0) {
  const page = document.createElement("div");
  page.className = "challenge-page";

  const langMeta = LANGUAGES.find(l => l.id === langId);
  const curriculum = CODE_CURRICULUM[langId];

  if (!langMeta || !curriculum) {
    page.innerHTML = `<div style="padding:4rem;text-align:center"><p>Challenge not found.</p></div>`;
    return page;
  }

  const level = curriculum.levels.find(l => l.id === parseInt(levelId));
  if (!level) {
    page.innerHTML = `<div style="padding:4rem;text-align:center"><p>Level not found.</p></div>`;
    return page;
  }

  let challengeIdx = parseInt(challengeIndex) || 0;
  let activeKeyboard = null;
  const settings = storage.getSettings();

  function render() {
    const challenge = level.challenges[challengeIdx];
    if (!challenge) {
      renderLevelComplete();
      return;
    }

    const totalChallenges = level.challenges.length;
    const progressPct = ((challengeIdx) / totalChallenges) * 100;

    page.innerHTML = `
      <div class="challenge-inner">

        <!-- Breadcrumb -->
        <nav class="ch-breadcrumb">
          <button class="ch-breadcrumb-btn" id="nav-overview">Code Learning</button>
          <span class="ch-breadcrumb-sep">/</span>
          <button class="ch-breadcrumb-btn" id="nav-langmap">${langMeta.name}</button>
          <span class="ch-breadcrumb-sep">/</span>
          <span class="ch-breadcrumb-current">Chapter ${level.id}: ${level.title}</span>
          <span class="ch-challenge-counter" style="color:${langMeta.color}">
            ${challengeIdx + 1} / ${totalChallenges}
          </span>
        </nav>

        <!-- Chapter Progress Bar -->
        <div class="ch-progress-wrap">
          <div class="ch-progress-bar">
            <div class="ch-progress-fill" style="width:${progressPct}%;background:${langMeta.color}"></div>
          </div>
        </div>

        <!-- Challenge Header Card -->
        <div class="ch-header-card">
          <div class="ch-header-top">
            <div class="ch-header-left">
              <div class="ch-lang-badge" style="background:${langMeta.bg};color:${langMeta.color};border-color:${langMeta.color}30">
                ${langMeta.icon}
              </div>
              <div>
                <h2 class="ch-title">${challenge.title}</h2>
                <span class="ch-meta">${langMeta.name} · Chapter ${level.id} · ${level.title}</span>
              </div>
            </div>
            <div class="ch-tip">
              💡 Type exactly as shown — Enter for new lines, Tab/Space for indentation
            </div>
          </div>
          <div class="ch-code-preview">
            <div class="ch-code-header">
              <div class="ch-dots">
                <span class="ch-dot" style="background:#ff5f56"></span>
                <span class="ch-dot" style="background:#ffbd2e"></span>
                <span class="ch-dot" style="background:#27c93f"></span>
              </div>
              <span class="ch-code-lang">${langId}</span>
            </div>
            <pre class="ch-code-body">${escapeHtml(challenge.code)}</pre>
          </div>
        </div>

        <!-- Typing Widget Mount -->
        <div id="code-widget-mount" class="ch-widget-wrap"></div>

        <!-- Learning Screen (shown after completion) -->
        <div id="learning-screen" style="display:none"></div>

      </div>
    `;

    page.querySelector("#nav-overview").addEventListener("click", () => router.navigate("/code-typing"));
    page.querySelector("#nav-langmap").addEventListener("click", () => router.navigate(`/code-typing/${langId}`));

    mountCodeWidget(challenge);
  }

  function mountCodeWidget(challenge) {
    const mount = page.querySelector("#code-widget-mount");
    mount.innerHTML = "";
    if (activeKeyboard) activeKeyboard.deactivate();

    const widget = createTypingWidget({
      mode: "code",
      language: langId,
      challengeText: challenge.code,
      showStats: true,
      showRetry: true,
      suppressResults: true, // ← KEY FIX: code mode handles its own results UI
      onComplete: async (stats) => {
        await handleChallengeComplete(challenge, stats);
      }
    });

    mount.appendChild(widget);
    setTimeout(() => widget.focus(), 120);
  }

  async function handleChallengeComplete(challenge, stats) {
    // Save result and unlock progress
    storage.unlockNextLevel(langId, level.id);

    // Run code
    let execResult = null;
    try {
      execResult = await executeCode(challenge.code, langId, challenge.expectedOutput || "");
    } catch (e) {
      execResult = { output: "Execution unavailable", matched: false };
    }

    // Hide typing widget, show learning screen
    const widgetWrap = page.querySelector("#code-widget-mount");
    if (widgetWrap) widgetWrap.style.display = "none";

    showLearningScreen(challenge, stats, execResult);
  }

  function showLearningScreen(challenge, stats, execResult) {
    const screen = page.querySelector("#learning-screen");
    if (!screen) return;
    screen.style.display = "block";

    const exp = challenge.explanation;
    const isCorrect = execResult && execResult.matched;
    const isLastChallenge = challengeIdx + 1 >= level.challenges.length;
    const nextLevelId = level.id + 1;
    const hasNextLevel = CODE_CURRICULUM[langId]?.levels.some(l => l.id === nextLevelId);

    screen.innerHTML = `
      <div class="ls-wrap">

        <!-- Stats Result Card -->
        <div class="ls-stats-card">
          <div class="ls-stats-header">
            <div class="ls-complete-badge">
              <span class="ls-complete-icon">✅</span>
              <div>
                <div class="ls-complete-title">Challenge Complete!</div>
                <div class="ls-complete-sub">${langMeta.name} · Chapter ${level.id}: ${level.title}</div>
              </div>
            </div>
            <div class="ls-challenge-num">
              ${challengeIdx + 1} of ${level.challenges.length}
            </div>
          </div>
          <div class="ls-stats-grid">
            <div class="ls-stat">
              <div class="ls-stat-num" style="color:${langMeta.color}">${stats.wpm}</div>
              <div class="ls-stat-label">WPM</div>
            </div>
            <div class="ls-stat">
              <div class="ls-stat-num" style="color:${stats.accuracy >= 95 ? 'var(--color-correct)' : 'var(--color-accent)'}">${stats.accuracy}%</div>
              <div class="ls-stat-label">Accuracy</div>
            </div>
            <div class="ls-stat">
              <div class="ls-stat-num" style="color:${stats.incorrectCount === 0 ? 'var(--color-correct)' : 'var(--color-error)'}">${stats.incorrectCount}</div>
              <div class="ls-stat-label">Errors</div>
            </div>
            <div class="ls-stat">
              <div class="ls-stat-num">${stats.elapsedSeconds}s</div>
              <div class="ls-stat-label">Time</div>
            </div>
          </div>
        </div>

        <!-- Explanation Card -->
        ${exp ? `
        <div class="ls-explain-card">
          <div class="ls-explain-header">
            <span class="ls-explain-icon">📖</span>
            <h3 class="ls-explain-title">${exp.conceptTitle}</h3>
          </div>
          <p class="ls-explain-body">${exp.conceptBody}</p>

          ${exp.breakdown && exp.breakdown.length ? `
          <div class="ls-section">
            <h4 class="ls-section-title">🔍 Line-by-Line Breakdown</h4>
            <div class="ls-breakdown-list">
              ${exp.breakdown.map(item => `
                <div class="ls-breakdown-item">
                  <span class="ls-breakdown-dot" style="background:${langMeta.color}"></span>
                  <span>${item}</span>
                </div>
              `).join("")}
            </div>
          </div>` : ""}

          ${exp.commonMistakes && exp.commonMistakes.length ? `
          <div class="ls-section">
            <h4 class="ls-section-title">⚠️ Common Mistakes</h4>
            <div class="ls-mistakes-list">
              ${exp.commonMistakes.map(m => `
                <div class="ls-mistake-item">
                  <span class="ls-mistake-icon">✗</span>
                  <code class="ls-mistake-text">${escapeHtml(m)}</code>
                </div>
              `).join("")}
            </div>
          </div>` : ""}

          ${exp.keyTakeaway ? `
          <div class="ls-takeaway">
            <div class="ls-takeaway-label">💡 Key Takeaway</div>
            <p class="ls-takeaway-text">${exp.keyTakeaway}</p>
          </div>` : ""}
        </div>` : ""}

        <!-- Navigation Buttons -->
        <div class="ls-nav-row">
          <button class="btn btn-ghost ls-nav-back" id="btn-back-levels">
            ← Back to Chapters
          </button>
          <div class="ls-nav-right">
            <button class="btn btn-secondary" id="btn-retry">
              ↻ Retry
            </button>
            ${isLastChallenge
              ? (hasNextLevel
                  ? `<button class="btn btn-primary btn-next-level" id="btn-next-level" style="background:${langMeta.color};color:#0f0f11;border-color:${langMeta.color}">
                       Next Chapter →
                     </button>`
                  : `<button class="btn btn-primary" id="btn-finish" style="background:${langMeta.color};color:#0f0f11">
                       🏆 Curriculum Complete!
                     </button>`)
              : `<button class="btn btn-primary" id="btn-next-challenge" style="background:${langMeta.color};color:#0f0f11;border-color:${langMeta.color}">
                   Next Challenge →
                 </button>`
            }
          </div>
        </div>

      </div>
    `;

    // Wire buttons
    screen.querySelector("#btn-back-levels").addEventListener("click", () => {
      router.navigate(`/code-typing/${langId}`);
    });

    screen.querySelector("#btn-retry").addEventListener("click", () => {
      screen.style.display = "none";
      const widgetWrap = page.querySelector("#code-widget-mount");
      if (widgetWrap) widgetWrap.style.display = "block";
      const kbdMount = page.querySelector("#keyboard-mount");
      if (kbdMount && settings.showVirtualKeyboard) kbdMount.style.display = "block";
      mountCodeWidget(challenge);
    });

    screen.querySelector("#btn-next-challenge")?.addEventListener("click", () => {
      challengeIdx++;
      render();
    });

    screen.querySelector("#btn-next-level")?.addEventListener("click", () => {
      router.navigate(`/code-typing/${langId}/level/${nextLevelId}/challenge/0`);
    });

    screen.querySelector("#btn-finish")?.addEventListener("click", () => {
      router.navigate(`/code-typing/${langId}`);
    });

    // Scroll to learning screen
    setTimeout(() => screen.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  function renderLevelComplete() {
    page.innerHTML = `
      <div class="lc-page">
        <div class="lc-confetti">🎉</div>
        <h1 class="lc-title">Chapter Complete!</h1>
        <p class="lc-sub">You've finished Chapter ${level.id}: <strong>${level.title}</strong></p>
        <div class="lc-actions">
          <button class="btn btn-secondary" id="view-map-btn">View All Chapters</button>
          <button class="btn btn-primary lc-next-btn" id="next-lvl-btn"
                  style="background:${langMeta.color};color:#0f0f11">
            Continue to Chapter ${level.id + 1} →
          </button>
        </div>
      </div>
    `;
    page.querySelector("#view-map-btn").addEventListener("click", () => router.navigate(`/code-typing/${langId}`));
    page.querySelector("#next-lvl-btn").addEventListener("click", () =>
      router.navigate(`/code-typing/${langId}/level/${level.id + 1}/challenge/0`)
    );
  }

  render();
  return page;
}
