/**
 * TypeForge Core Typing Widget
 * Reusable typing interface component for all three modes
 * Features blur focus overlay, zero page scroll, sub-1ms key processor
 */
import { TypingEngine } from "../engine/TypingEngine.js";
import { sound } from "../services/sound.js";
import { storage } from "../services/storage.js";

export function createTypingWidget(options = {}) {
  const {
    mode = "text",         // 'text' | 'quote' | 'code'
    language = "english",
    challengeText = "",
    timeLimit = 0,         // 0 = no time limit (word count or infinite)
    showStats = true,
    onComplete = null,
    showRetry = true,
    compact = false,        // true = mini widget for homepage
    suppressResults = false // true = skip internal results panel, just fire onComplete (used by code challenges)
  } = options;

  const settings = storage.getSettings();
  const soundEnabled = settings.soundEnabled;

  let engine = null;
  let timerIntervalId = null;
  let remainingTime = timeLimit;
  let caretBlinkTimeout = null;
  let currentText = challengeText;

  // ─── Outer Container ────────────────────────────────────────────────────────
  const container = document.createElement("div");
  container.className = "typing-widget-wrapper";

  // ─── Stats Bar (Live Floating Header) ───────────────────────────────────────
  const statsBar = document.createElement("div");
  statsBar.className = "stats-header";
  statsBar.style.display = showStats ? "flex" : "none";
  statsBar.innerHTML = `
    <div class="stat-item">
      <span class="stat-label">WPM</span>
      <span class="stat-value" id="wpm-display">0</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">ACC</span>
      <span class="stat-value" id="acc-display">100%</span>
    </div>
    ${timeLimit > 0 ? `
    <div class="stat-item">
      <span class="stat-label">TIME</span>
      <span class="stat-value" id="timer-display">${timeLimit}s</span>
    </div>` : ""}
  `;

  // ─── Typing Display Box ──────────────────────────────────────────────────────
  const typingBox = document.createElement("div");
  typingBox.className = `typing-box is-blurred${compact ? " compact" : ""}`;
  typingBox.id = "typing-box";
  typingBox.setAttribute("tabindex", "0");
  typingBox.setAttribute("role", "textbox");
  typingBox.setAttribute("aria-label", "Typing challenge area. Click or press any key to focus.");
  typingBox.setAttribute("aria-multiline", "true");

  const textDisplay = document.createElement("div");
  textDisplay.className = `typing-text-display${mode === "code" ? " mode-code" : ""}`;
  textDisplay.id = "text-display";

  const hiddenInput = document.createElement("input");
  hiddenInput.type = "text";
  hiddenInput.className = "hidden-input";
  hiddenInput.id = "hidden-input";
  hiddenInput.setAttribute("autocorrect", "off");
  hiddenInput.setAttribute("autocomplete", "off");
  hiddenInput.setAttribute("autocapitalize", "off");
  hiddenInput.setAttribute("spellcheck", "false");

  // Blur Focus Overlay
  const blurOverlay = document.createElement("div");
  blurOverlay.className = "typing-blur-overlay";
  blurOverlay.id = "blur-overlay";
  blurOverlay.innerHTML = `
    <div class="blur-content">
      <span class="blur-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
      </span>
      <span class="blur-text">Click or press any key to begin</span>
    </div>
  `;

  typingBox.appendChild(textDisplay);
  typingBox.appendChild(hiddenInput);
  typingBox.appendChild(blurOverlay);

  // ─── Results Panel ────────────────────────────────────────────────────────────
  const resultsPanel = document.createElement("div");
  resultsPanel.id = "results-panel";
  resultsPanel.style.display = "none";

  // ─── Assemble Container ────────────────────────────────────────────────────────
  container.appendChild(statsBar);
  container.appendChild(typingBox);
  container.appendChild(resultsPanel);

  // ─── Initialize Engine ────────────────────────────────────────────────────────
  function initEngine(text) {
    currentText = text;
    engine = new TypingEngine(text, { mode, language });

    engine.onCharacterInput(({ character, currentIndex, action }) => {
      updateCharacter(character, currentIndex);
      if (soundEnabled) {
        if (action === "correct") sound.playKeystroke(false);
        else if (action === "incorrect") sound.playKeystroke(true);
      }
      resetCaretBlink();
    });

    engine.onTick((stats) => {
      if (!settings.liveWpm) return;
      const wpmEl = statsBar.querySelector("#wpm-display");
      const accEl = statsBar.querySelector("#acc-display");
      if (wpmEl) wpmEl.textContent = stats.wpm;
      if (accEl) accEl.textContent = stats.accuracy + "%";
    });

    engine.onComplete(async (finalStats) => {
      clearInterval(timerIntervalId);
      if (soundEnabled) sound.playSuccess();
      if (suppressResults) {
        if (onComplete) await onComplete(finalStats);
      } else {
        await showResults(finalStats);
        if (onComplete) onComplete(finalStats);
      }
    });

    renderText(text);
    // Reset scroll position
    typingBox._scrollY = 0;
    textDisplay.style.transform = 'translateY(0px)';
  }

  // ─── Render Characters ──────────────────────────────────────────────────────
  function renderText(text) {
    textDisplay.innerHTML = "";
    const chars = text.split("");
    chars.forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "char untyped";
      span.dataset.index = i;

      if (char === "\n") {
        span.textContent = "\n";
        span.style.display = "inline";
      } else {
        span.textContent = char === " " ? "\u00A0" : char;
      }
      textDisplay.appendChild(span);
    });

    // Caret element
    const caret = document.createElement("span");
    caret.className = "caret";
    caret.id = "typing-caret";
    textDisplay.appendChild(caret);
    updateCaretPosition(0);
  }

  function updateCharacter(charObj, nextIndex) {
    const charEl = textDisplay.querySelector(`[data-index="${charObj.index}"]`);
    if (charEl) {
      charEl.className = `char ${charObj.status}`;
    }
    updateCaretPosition(nextIndex);
  }

  function updateCaretPosition(index) {
    const caret = textDisplay.querySelector("#typing-caret");
    if (!caret) return;
    const targetChar = textDisplay.querySelector(`[data-index="${index}"]`);

    let caretTop = 0;
    let caretLeft = 0;

    if (targetChar) {
      // Use offsetTop/offsetLeft relative to textDisplay
      caretLeft = targetChar.offsetLeft;
      caretTop  = targetChar.offsetTop;
    } else {
      const allChars = textDisplay.querySelectorAll("[data-index]");
      const lastChar = allChars[allChars.length - 1];
      if (lastChar) {
        caretLeft = lastChar.offsetLeft + lastChar.offsetWidth;
        caretTop  = lastChar.offsetTop;
      }
    }

    caret.style.left = caretLeft + "px";
    caret.style.top  = caretTop + "px";

    // --- Internal scroll: typingBox is overflow:hidden, fixed height.
    // We manually scroll textDisplay by adjusting its translateY,
    // keeping the active line always in the centre-top of the visible area.
    const lineHeight = parseFloat(getComputedStyle(textDisplay).lineHeight) || 42;
    const boxPaddingTop = parseFloat(getComputedStyle(typingBox).paddingTop) || 30;
    const visibleHeight = typingBox.clientHeight - boxPaddingTop * 2;

    // Calculate the scroll offset so the current line is at ~top-1/3 of the box
    const targetScroll = Math.max(0, caretTop - Math.floor(visibleHeight / 3));

    // Smooth-ish nudge (avoid jumpiness by only moving if delta > threshold)
    const currentScroll = typingBox._scrollY || 0;
    if (Math.abs(targetScroll - currentScroll) > 2) {
      typingBox._scrollY = targetScroll;
      textDisplay.style.transform = `translateY(${-targetScroll}px)`;
    }
  }

  function resetCaretBlink() {
    const caret = textDisplay.querySelector("#typing-caret");
    if (caret) caret.classList.add("typing");
    clearTimeout(caretBlinkTimeout);
    caretBlinkTimeout = setTimeout(() => {
      if (caret) caret.classList.remove("typing");
    }, 1000);
  }

  function startTimer() {
    if (!timeLimit) return;
    remainingTime = timeLimit;
    timerIntervalId = setInterval(() => {
      remainingTime--;
      const timerEl = statsBar.querySelector("#timer-display");
      if (timerEl) timerEl.textContent = remainingTime + "s";

      if (remainingTime <= 0) {
        clearInterval(timerIntervalId);
        if (engine && engine.status === "active") {
          engine.stop();
        }
      }
    }, 1000);
  }

  // ─── Results Screen ────────────────────────────────────────────────────────
  async function showResults(stats) {
    typingBox.style.display = "none";
    resultsPanel.style.display = "block";

    const pb = storage.getPersonalBest(mode, language);
    const isNewBest = !pb || stats.wpm > pb.wpm;

    await storage.saveTestResult({ ...stats, mode, language });

    resultsPanel.innerHTML = `
      <div class="results-card">
        <div class="results-header">
          <h2 class="results-title">
            ${isNewBest ? "New Personal Best" : "Test Complete"}
          </h2>
          <span class="results-mode-label">${mode} mode</span>
        </div>

        <div class="results-grid">
          <div class="result-stat-box">
            <div class="result-stat-number">${stats.wpm}</div>
            <div class="result-stat-label">WPM</div>
          </div>
          <div class="result-stat-box">
            <div class="result-stat-number">${stats.accuracy}%</div>
            <div class="result-stat-label">Accuracy</div>
          </div>
          <div class="result-stat-box">
            <div class="result-stat-number">${stats.rawWpm}</div>
            <div class="result-stat-label">Raw WPM</div>
          </div>
          <div class="result-stat-box">
            <div class="result-stat-number">${stats.incorrectCount}</div>
            <div class="result-stat-label">Errors</div>
          </div>
          <div class="result-stat-box">
            <div class="result-stat-number">${stats.consistency}%</div>
            <div class="result-stat-label">Consistency</div>
          </div>
          <div class="result-stat-box">
            <div class="result-stat-number">${stats.elapsedSeconds}s</div>
            <div class="result-stat-label">Time</div>
          </div>
        </div>

        ${pb && !isNewBest ? `
        <div class="results-pb-row">
          <span>Personal Best: <strong style="color:var(--color-accent)">${pb.wpm} WPM</strong></span>
          <span>&nbsp;—&nbsp;</span>
          <span>Accuracy: <strong>${pb.accuracy}%</strong></span>
        </div>` : ""}

        <div class="results-actions">
          ${showRetry ? `<button class="btn btn-primary" id="retry-btn">Try Again</button>` : ""}
          <button class="btn btn-secondary" id="view-progress-btn">View Progress</button>
        </div>
      </div>
    `;

    resultsPanel.querySelector("#retry-btn")?.addEventListener("click", () => {
      retry();
    });

    resultsPanel.querySelector("#view-progress-btn")?.addEventListener("click", () => {
      window.history.pushState({}, "", "/progress");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }

  function retry() {
    resultsPanel.style.display = "none";
    typingBox.style.display = "block";
    typingBox._scrollY = 0;
    textDisplay.style.transform = 'translateY(0px)';
    initEngine(currentText);
    focusWidget();
  }

  // ─── Focus & Blur Handler ───────────────────────────────────────────────────
  function focusWidget() {
    typingBox.classList.remove("is-blurred");
    hiddenInput.focus();
  }

  typingBox.addEventListener("click", focusWidget);
  blurOverlay.addEventListener("click", focusWidget);

  hiddenInput.addEventListener("focus", () => {
    typingBox.classList.remove("is-blurred");
  });

  hiddenInput.addEventListener("blur", () => {
    if (!engine || engine.status !== "active") {
      typingBox.classList.add("is-blurred");
    }
  });

  hiddenInput.addEventListener("keydown", (e) => {
    if (!engine) return;

    // Prevent default browser hotkeys (Find, search, etc.)
    const allow = e.ctrlKey && (e.key === "c" || e.key === "x" || e.key === "z" || e.key === "y");
    if (!allow) {
      e.preventDefault();
    }

    if (e.ctrlKey || e.metaKey) {
      if (e.key === "a" || e.key === "v") {
        return;
      }
    }

    engine.handleInput(e);

    if (engine.status === "active" && timeLimit > 0 && timerIntervalId === null) {
      startTimer();
    }
  });

  hiddenInput.addEventListener("paste", (e) => {
    e.preventDefault();
  });

  // ─── Public API ────────────────────────────────────────────────────────────
  container.setChallenge = (text) => {
    resultsPanel.style.display = "none";
    typingBox.style.display = "block";
    initEngine(text);
  };

  container.focus = () => focusWidget();
  container.reset = () => retry();

  // Initialize with provided text
  if (challengeText) {
    initEngine(challengeText);
  }

  return container;
}
