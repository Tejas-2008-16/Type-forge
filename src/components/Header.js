/**
 * TypeForge Header & Navigation Component
 */
import { storage } from "../services/storage.js";

export function createHeader(router) {
  const header = document.createElement("header");
  header.className = "header";
  header.id = "main-header";

  header.innerHTML = `
    <div class="header-container">
      <a href="/" class="logo" data-nav>
        <span class="logo-prompt">&gt;_</span>
        <span>TypeForge</span>
      </a>

      <nav>
        <ul class="nav-links" id="main-nav">
          <li><a href="/typing-test" class="nav-link" data-path="/typing-test" data-nav>Typing Test</a></li>
          <li><a href="/quotes" class="nav-link" data-path="/quotes" data-nav>Quotes</a></li>
          <li><a href="/code-typing" class="nav-link" data-path="/code-typing" data-nav>Code Learning</a></li>
          <li><a href="/articles" class="nav-link" data-path="/articles" data-nav>Articles</a></li>
          <li><a href="/progress" class="nav-link" data-path="/progress" data-nav>Progress</a></li>
        </ul>
      </nav>

      <div class="nav-controls">
        <button class="icon-btn" id="theme-toggle" title="Toggle theme" aria-label="Toggle dark/light mode">
          <svg id="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </button>
        <button class="icon-btn mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Theme toggle
  const themeBtn = header.querySelector("#theme-toggle");
  themeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    html.classList.toggle("dark", !isDark);
    html.classList.toggle("light", isDark);
    const settings = storage.getSettings();
    storage.saveSettings({ ...settings, theme: isDark ? "light" : "dark" });
    updateThemeIcon(themeBtn, !isDark);
  });

  // Mobile menu toggle
  const mobileBtn = header.querySelector("#mobile-menu-btn");
  const navLinks = header.querySelector("#main-nav");
  mobileBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });

  // Client-side navigation: intercept all [data-nav] links
  header.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      navLinks.classList.remove("mobile-open");
      router.navigate(href);
    });
  });

  // Apply saved theme
  const saved = storage.getSettings();
  const isDark = saved.theme !== "light";
  document.documentElement.classList.add(isDark ? "dark" : "light");
  document.documentElement.classList.remove(isDark ? "light" : "dark");
  updateThemeIcon(themeBtn, isDark);

  return header;
}

function updateThemeIcon(btn, isDark) {
  if (isDark) {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>`;
  } else {
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>`;
  }
}
