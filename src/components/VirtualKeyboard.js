/**
 * TypeForge Virtual Keyboard Component
 * Optional visual keyboard highlight on keypress events
 */

const KEYBOARD_ROWS = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
  ["Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
  ["", "Space", ""]
];

const WIDE_KEYS = new Set(["Tab", "Caps", "Enter"]);
const EXTRA_WIDE_KEYS = new Set(["Backspace", "Shift"]);
const SPACE_KEYS = new Set(["Space"]);

export function createVirtualKeyboard() {
  const container = document.createElement("div");
  container.className = "virtual-keyboard";
  container.id = "virtual-keyboard";
  container.setAttribute("aria-hidden", "true");

  KEYBOARD_ROWS.forEach(row => {
    const rowEl = document.createElement("div");
    rowEl.className = "keyboard-row";

    row.forEach(key => {
      if (!key) return;
      const keyEl = document.createElement("div");
      keyEl.className = "key-cap";

      if (WIDE_KEYS.has(key)) keyEl.classList.add("wide");
      if (EXTRA_WIDE_KEYS.has(key)) keyEl.classList.add("extra-wide");
      if (SPACE_KEYS.has(key)) keyEl.classList.add("space");

      keyEl.textContent = SPACE_KEYS.has(key) ? "" : key;
      keyEl.dataset.key = key.toLowerCase();
      rowEl.appendChild(keyEl);
    });

    container.appendChild(rowEl);
  });

  /**
   * Maps a keyboard event key to the data-key attribute value used on key caps.
   * Returns null for keys that are unsafe as CSS selector values or not on keyboard.
   */
  function normalizeKey(key) {
    if (key === " ") return "space";
    if (key === "Backspace") return "backspace";
    if (key === "Enter") return "enter";
    if (key === "Tab") return "tab";
    if (key === "CapsLock") return "caps";
    if (key === "Shift") return "shift";
    if (key === "Control") return "control";
    if (key === "Alt") return "alt";

    // Only highlight single-char keys that exist on the keyboard layout
    // Exclude quote characters and other CSS-selector-breaking chars
    const lower = key.toLowerCase();
    if (
      lower.length === 1 &&
      /^[a-z0-9`\-=\[\]\\;,./]$/.test(lower)
    ) {
      return lower;
    }
    return null; // skip unknown or CSS-unsafe keys (e.g. ", ', {, }, etc.)
  }

  // ─── Key Highlight Handlers ────────────────────────────────────────────────
  const handleKeydown = (e) => {
    const normalized = normalizeKey(e.key);
    if (!normalized) return;
    container.querySelectorAll(`[data-key="${normalized}"]`)
      .forEach(el => el.classList.add("active"));
  };

  const handleKeyup = (e) => {
    const normalized = normalizeKey(e.key);
    if (!normalized) return;
    container.querySelectorAll(`[data-key="${normalized}"]`)
      .forEach(el => el.classList.remove("active"));
  };

  // ─── Public API ────────────────────────────────────────────────────────────
  container.activate = () => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);
  };

  container.deactivate = () => {
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("keyup", handleKeyup);
  };

  return container;
}
