/**
 * TypeForge Quotes View — Mode B (Quote Typing)
 * Scroll-free compact quote typing screen with zero virtual keyboard
 */
import { createTypingWidget } from "../components/TypingWidget.js";
import { QUOTES, getRandomQuote } from "../data/quotesData.js";
import { storage } from "../services/storage.js";

export function createQuotesView(router) {
  const page = document.createElement("div");
  page.className = "quotes-page";

  let activeCategory = "all";
  let activeDifficulty = "all";
  let currentQuote = null;

  page.innerHTML = `
    <div class="test-viewport-container">

      <!-- Filters & Controls Bar -->
      <div class="mode-selector-bar">
        <div class="mode-group">
          ${["all", "technology", "motivation", "wisdom", "science"].map(c =>
            `<button class="mode-btn${c === "all" ? " active" : ""}" data-cat="${c}">${c.charAt(0).toUpperCase() + c.slice(1)}</button>`
          ).join("")}
        </div>
        <span class="mode-bar-divider">|</span>
        <div class="mode-group">
          ${["all", "easy", "medium", "hard"].map(d =>
            `<button class="mode-btn${d === "all" ? " active" : ""}" data-diff="${d}">${d.charAt(0).toUpperCase() + d.slice(1)}</button>`
          ).join("")}
        </div>
        <span class="mode-bar-divider">|</span>
        <div class="mode-group">
          <button class="mode-btn" id="next-quote-btn">Next Quote →</button>
        </div>
      </div>

      <!-- Compact Quote Attribution Display -->
      <div id="quote-meta" class="quote-meta-compact">
        <!-- filled by loadQuote() -->
      </div>

      <!-- Typing Widget -->
      <div id="quote-widget-mount"></div>

      <!-- Personal Best -->
      <div class="test-footer-hints">
        <span id="pb-footer">Loading quotes...</span>
      </div>

    </div>
  `;

  function loadQuote() {
    currentQuote = getRandomQuote(activeCategory, activeDifficulty);
    const metaEl = page.querySelector("#quote-meta");

    metaEl.innerHTML = `
      <div class="qm-content">
        <span class="qm-quote-mark">“</span>
        <div class="qm-details">
          <span class="qm-attribution">— ${currentQuote.attribution}</span>
          <span class="qm-tags">
            <span class="qm-tag">${currentQuote.category}</span>
            <span class="qm-tag qm-diff">${currentQuote.difficulty}</span>
          </span>
        </div>
      </div>
    `;

    mountWidget(currentQuote.text);
    updatePB();
  }

  function mountWidget(text) {
    const mount = page.querySelector("#quote-widget-mount");
    mount.innerHTML = "";

    const widget = createTypingWidget({
      mode: "quote",
      language: "english",
      challengeText: text,
      showStats: true,
      showRetry: true,
      onComplete: () => updatePB()
    });
    mount.appendChild(widget);
  }

  function updatePB() {
    const pb = storage.getPersonalBest("quote", "english");
    const el = page.querySelector("#pb-footer");
    if (el) el.textContent = pb ? `Quotes Best: ${pb.wpm} WPM (${pb.accuracy}% acc)` : "Quotes mode active";
  }

  // Filters
  page.addEventListener("click", e => {
    const catBtn = e.target.closest("[data-cat]");
    if (catBtn) {
      activeCategory = catBtn.dataset.cat;
      page.querySelectorAll("[data-cat]").forEach(b => b.classList.remove("active"));
      catBtn.classList.add("active");
      loadQuote();
    }
    const diffBtn = e.target.closest("[data-diff]");
    if (diffBtn) {
      activeDifficulty = diffBtn.dataset.diff;
      page.querySelectorAll("[data-diff]").forEach(b => b.classList.remove("active"));
      diffBtn.classList.add("active");
      loadQuote();
    }
  });

  page.querySelector("#next-quote-btn").addEventListener("click", loadQuote);

  loadQuote();
  return page;
}
