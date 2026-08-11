/**
 * TypeForge Progress Dashboard View
 * Local WPM history, personal bests, and level completion across all languages
 */
import { storage } from "../services/storage.js";
import { LANGUAGES } from "../data/codeCurriculum.js";

export function createProgressView(router) {
  const page = document.createElement("div");
  page.style.cssText = "padding:1.5rem 0 4rem;";

  async function render() {
    const history = await storage.getTestHistory(20);

    const textPB = storage.getPersonalBest("text", "english");
    const quotePB = storage.getPersonalBest("quote", "english");

    page.innerHTML = `
      <div style="max-width:1000px;margin:0 auto;padding:0 1.5rem">
        <div style="text-align:center;padding-bottom:2rem">
          <h1 style="font-size:2rem;font-weight:800">My Progress</h1>
          <p style="color:var(--color-text-secondary);margin-top:0.35rem">All progress stored locally in your browser. Your data never leaves your device.</p>
        </div>

        <!-- Personal Bests Grid -->
        <div style="margin-bottom:2.5rem">
          <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem">Personal Bests</h2>
          <div class="results-grid">
            <div class="result-stat-box">
              <div class="result-stat-number">${textPB ? textPB.wpm : "—"}</div>
              <div class="result-stat-label">Text WPM Best</div>
            </div>
            <div class="result-stat-box">
              <div class="result-stat-number">${textPB ? textPB.accuracy + "%" : "—"}</div>
              <div class="result-stat-label">Text Accuracy</div>
            </div>
            <div class="result-stat-box">
              <div class="result-stat-number">${quotePB ? quotePB.wpm : "—"}</div>
              <div class="result-stat-label">Quote WPM Best</div>
            </div>
            <div class="result-stat-box">
              <div class="result-stat-number">${history.length}</div>
              <div class="result-stat-label">Total Sessions</div>
            </div>
          </div>
        </div>

        <!-- Code Learning Progress -->
        <div style="margin-bottom:2.5rem">
          <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem">Code Learning Progress</h2>
          <div style="display:flex;flex-direction:column;gap:0.75rem">
            ${LANGUAGES.map(lang => {
              const unlocked = storage.getUnlockedLevel(lang.id);
              const completed = Math.max(0, unlocked - 1);
              const pct = Math.round((completed / lang.levelsCount) * 100);
              return `
                <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1rem 1.25rem;display:flex;align-items:center;gap:1rem;cursor:pointer" data-lang="${lang.id}">
                  <div style="font-family:var(--font-mono);font-size:0.75rem;background:var(--color-accent-dim);color:var(--color-accent);padding:0.2rem 0.5rem;border-radius:3px;min-width:42px;text-align:center">${lang.icon}</div>
                  <div style="flex:1">
                    <div style="font-weight:600;font-size:0.9375rem">${lang.name}</div>
                    <div style="height:5px;background:var(--color-border);border-radius:99px;margin-top:0.4rem;overflow:hidden">
                      <div style="height:100%;width:${pct}%;background:var(--color-accent);border-radius:99px;transition:width 0.5s ease"></div>
                    </div>
                  </div>
                  <div style="text-align:right;font-size:0.8125rem;color:var(--color-text-secondary)">
                    <div style="color:var(--color-accent);font-weight:700">${completed}/${lang.levelsCount}</div>
                    <div>${pct}%</div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Recent Test History -->
        <div>
          <h2 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem">Recent Tests</h2>
          ${history.length === 0 ? `
            <div style="text-align:center;padding:3rem;color:var(--color-text-muted);background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-xl)">
              <p>No tests completed yet.</p>
              <a href="/typing-test" data-nav class="btn btn-primary btn-sm" style="display:inline-flex;margin-top:1rem">Start your first test →</a>
            </div>
          ` : `
            <div style="overflow-x:auto">
              <table style="width:100%;border-collapse:collapse;font-size:0.875rem">
                <thead>
                  <tr style="border-bottom:1px solid var(--color-border)">
                    ${["Mode", "Language", "WPM", "Accuracy", "Consistency", "Date"].map(h =>
                      `<th style="text-align:left;padding:0.75rem 1rem;color:var(--color-text-secondary);font-weight:600;text-transform:uppercase;font-size:0.75rem;letter-spacing:0.05em">${h}</th>`
                    ).join("")}
                  </tr>
                </thead>
                <tbody>
                  ${history.map(r => `
                    <tr style="border-bottom:1px solid var(--color-border)">
                      <td style="padding:0.75rem 1rem"><span style="background:var(--color-surface-alt);padding:0.15rem 0.5rem;border-radius:var(--radius-full);font-size:0.75rem;border:1px solid var(--color-border)">${r.mode}</span></td>
                      <td style="padding:0.75rem 1rem;color:var(--color-text-secondary)">${r.language}</td>
                      <td style="padding:0.75rem 1rem;font-weight:700;color:var(--color-accent);font-family:var(--font-mono)">${r.wpm}</td>
                      <td style="padding:0.75rem 1rem;color:${r.accuracy >= 95 ? "var(--color-correct)" : r.accuracy >= 85 ? "var(--color-text-primary)" : "var(--color-error)"};font-family:var(--font-mono)">${r.accuracy}%</td>
                      <td style="padding:0.75rem 1rem;font-family:var(--font-mono)">${r.consistency}%</td>
                      <td style="padding:0.75rem 1rem;color:var(--color-text-secondary)">${new Date(r.timestamp).toLocaleDateString()}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    `;

    page.querySelectorAll("[data-lang]").forEach(row => {
      row.addEventListener("click", () => router.navigate(`/code-typing/${row.dataset.lang}`));
    });
    page.querySelectorAll("[data-nav]").forEach(link => {
      link.addEventListener("click", e => { e.preventDefault(); router.navigate(link.getAttribute("href")); });
    });
  }

  render();
  return page;
}
