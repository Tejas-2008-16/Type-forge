/**
 * TypeForge Typing Test View — Mode A (Text Typing)
 * Clean, scroll-free typing test screen with green correct text & zero virtual keyboard
 */
import { createTypingWidget } from "../components/TypingWidget.js";
import { getRandomWords, ENGLISH_200, TECH_TERMS, HINDI_200, MARATHI_200, SENTENCES_EASY } from "../data/textData.js";
import { storage } from "../services/storage.js";

const LANGUAGES_CONFIG = {
  english: { label: "English", dataset: ENGLISH_200 },
  tech: { label: "Tech Terms", dataset: TECH_TERMS },
  hindi: { label: "Hindi (हिंदी)", dataset: HINDI_200 },
  marathi: { label: "Marathi (मराठी)", dataset: MARATHI_200 },
  sentences: { label: "Sentences", dataset: SENTENCES_EASY, isSentences: true }
};

const TIME_OPTIONS = [15, 30, 60, 120];
const WORD_OPTIONS = [10, 25, 50, 100];

export function createTypingTestView(router) {
  const page = document.createElement("div");
  page.className = "typing-test-page";

  let currentMode = "timed";   // 'timed' | 'words'
  let currentTime = 60;
  let currentWords = 25;
  let currentLang = "english";
  let activeWidget = null;

  page.innerHTML = `
    <div class="test-viewport-container">

      <!-- Mode & Language Selector Bar -->
      <div class="mode-selector-bar">
        <!-- Left: typing mode -->
        <div class="mode-group" id="type-mode-group">
          <button class="mode-btn active" data-type="timed">Timed</button>
          <button class="mode-btn" data-type="words">Words</button>
        </div>

        <span class="mode-bar-divider">|</span>

        <!-- Center: duration/count options -->
        <div class="mode-group" id="duration-group">
          ${TIME_OPTIONS.map(t => `<button class="mode-btn${t === 60 ? " active" : ""}" data-time="${t}">${t}s</button>`).join("")}
        </div>

        <span class="mode-bar-divider">|</span>

        <!-- Right: language -->
        <div class="mode-group" id="lang-group">
          ${Object.entries(LANGUAGES_CONFIG).map(([key, cfg]) => `<button class="mode-btn${key === "english" ? " active" : ""}" data-lang="${key}">${cfg.label}</button>`).join("")}
        </div>
      </div>

      <!-- Typing Widget Mount -->
      <div id="typing-mount"></div>

      <!-- Personal Best & Restart Hint -->
      <div class="test-footer-hints">
        <span id="pb-footer">Loading personal best...</span>
        <span class="hint-shortcut">Tip: Click restart or press <code>Tab</code> + <code>Enter</code> to restart</span>
      </div>

      <!-- AdSense Unit Placeholder -->
      <div class="ad-banner-slot">
        <div class="ad-label">ADVERTISEMENT</div>
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
      </div>

    </div>
  `;

  function getChallenge() {
    const langConfig = LANGUAGES_CONFIG[currentLang];
    if (langConfig.isSentences) {
      const pool = langConfig.dataset;
      const count = currentMode === "timed" ? 8 : Math.max(1, Math.ceil(currentWords / 8));
      const selected = [];
      for (let i = 0; i < count; i++) {
        selected.push(pool[Math.floor(Math.random() * pool.length)]);
      }
      return selected.join(" ");
    }
    const count = currentMode === "words" ? currentWords : (currentTime * 3);
    return getRandomWords(count, langConfig.dataset);
  }

  function mountWidget() {
    const mount = page.querySelector("#typing-mount");
    mount.innerHTML = "";

    const text = getChallenge();
    activeWidget = createTypingWidget({
      mode: "text",
      language: currentLang,
      challengeText: text,
      timeLimit: currentMode === "timed" ? currentTime : 0,
      showStats: true,
      showRetry: true,
      onComplete: () => updatePB()
    });

    mount.appendChild(activeWidget);
    updatePB();
  }

  function updatePB() {
    const pb = storage.getPersonalBest("text", currentLang);
    const el = page.querySelector("#pb-footer");
    if (el) {
      el.textContent = pb ? `Best: ${pb.wpm} WPM (${pb.accuracy}% acc)` : "No baseline set yet";
    }
  }

  // ── Mode Selector Events ──
  page.querySelector("#type-mode-group").addEventListener("click", e => {
    const btn = e.target.closest("[data-type]");
    if (!btn) return;
    currentMode = btn.dataset.type;
    page.querySelectorAll("[data-type]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const durGroup = page.querySelector("#duration-group");
    durGroup.innerHTML = "";
    if (currentMode === "timed") {
      TIME_OPTIONS.forEach(t => {
        const b = document.createElement("button");
        b.className = `mode-btn${t === currentTime ? " active" : ""}`;
        b.dataset.time = t;
        b.textContent = `${t}s`;
        durGroup.appendChild(b);
      });
    } else {
      WORD_OPTIONS.forEach(w => {
        const b = document.createElement("button");
        b.className = `mode-btn${w === currentWords ? " active" : ""}`;
        b.dataset.words = w;
        b.textContent = `${w} words`;
        durGroup.appendChild(b);
      });
    }

    mountWidget();
  });

  page.querySelector("#duration-group").addEventListener("click", e => {
    const btn = e.target.closest("[data-time], [data-words]");
    if (!btn) return;
    page.querySelectorAll("[data-time], [data-words]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (btn.dataset.time) currentTime = parseInt(btn.dataset.time);
    if (btn.dataset.words) currentWords = parseInt(btn.dataset.words);
    mountWidget();
  });

  page.addEventListener("click", e => {
    const btn = e.target.closest("[data-lang]");
    if (!btn) return;
    currentLang = btn.dataset.lang;
    page.querySelectorAll("[data-lang]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    mountWidget();
  });

  mountWidget();
  return page;
}
