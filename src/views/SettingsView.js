/**
 * TypeForge Settings View
 */
import { storage } from "../services/storage.js";

export function createSettingsView(router) {
  const page = document.createElement("div");
  page.style.cssText = "padding:1.5rem 0 4rem;";

  const settings = storage.getSettings();

  page.innerHTML = `
    <div style="max-width:720px;margin:0 auto;padding:0 1.5rem">
      <div style="text-align:center;padding-bottom:2rem">
        <h1 style="font-size:2rem;font-weight:800">Settings</h1>
        <p style="color:var(--color-text-secondary);margin-top:0.35rem">Preferences are saved locally and persist across sessions.</p>
      </div>

      <div style="display:flex;flex-direction:column;gap:1rem">
        ${buildSetting("Appearance", [
          buildToggle("Dark Mode", "theme", settings.theme !== "light", "Switch between dark and light interface"),
          buildToggle("Show Live WPM", "liveWpm", settings.liveWpm, "Display words per minute counter while typing"),
          buildToggle("Show Virtual Keyboard", "showVirtualKeyboard", settings.showVirtualKeyboard, "Display on-screen keyboard that highlights pressed keys"),
          buildToggle("Sound Effects", "soundEnabled", settings.soundEnabled, "Subtle audio feedback on keystrokes (off by default)")
        ])}
      </div>

      <div style="margin-top:2rem;padding:1.5rem;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-xl)">
        <h3 style="font-weight:700;margin-bottom:0.5rem">Privacy</h3>
        <p style="color:var(--color-text-secondary);font-size:0.875rem;margin-bottom:1rem">All progress, settings, and test history are stored exclusively in your browser's local storage. No data is transmitted to external servers.</p>
        <button class="btn btn-secondary btn-sm" id="clear-data-btn" style="color:var(--color-error);border-color:var(--color-error)">Clear All Local Data</button>
      </div>
    </div>
  `;

  function buildSetting(title, rows) {
    return `
      <div style="background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-xl);overflow:hidden">
        <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--color-border);font-weight:700;font-size:0.9375rem;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:0.05em;font-size:0.75rem">${title}</div>
        ${rows.join("")}
      </div>
    `;
  }

  function buildToggle(label, key, active, description) {
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.5rem;border-bottom:1px solid var(--color-border)">
        <div>
          <div style="font-weight:600">${label}</div>
          <div style="font-size:0.8125rem;color:var(--color-text-muted)">${description}</div>
        </div>
        <button class="toggle-btn${active ? " active" : ""}" data-setting="${key}"
          style="width:44px;height:24px;border-radius:var(--radius-full);background:${active ? "var(--color-accent)" : "var(--color-border)"};border:none;cursor:pointer;position:relative;transition:background var(--duration-fast)" 
          aria-checked="${active}" role="switch">
          <span style="position:absolute;top:2px;left:${active ? "22px" : "2px"};width:20px;height:20px;border-radius:50%;background:#fff;transition:left var(--duration-fast)"></span>
        </button>
      </div>
    `;
  }

  // Toggle interactions
  page.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.setting;
      const isActive = btn.classList.contains("active");
      const newState = !isActive;

      btn.classList.toggle("active", newState);
      btn.style.background = newState ? "var(--color-accent)" : "var(--color-border)";
      btn.setAttribute("aria-checked", newState);
      btn.querySelector("span").style.left = newState ? "22px" : "2px";

      // Apply & save
      const currentSettings = storage.getSettings();
      if (key === "theme") {
        const theme = newState ? "dark" : "light";
        document.documentElement.classList.toggle("dark", newState);
        document.documentElement.classList.toggle("light", !newState);
        storage.saveSettings({ ...currentSettings, theme });
      } else {
        storage.saveSettings({ ...currentSettings, [key]: newState });
      }
    });
  });

  page.querySelector("#clear-data-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear ALL local data? This cannot be undone.")) {
      localStorage.clear();
      location.reload();
    }
  });

  return page;
}
