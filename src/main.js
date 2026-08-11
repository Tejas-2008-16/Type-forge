/**
 * TypeForge — Main Application Entry Point
 * Assembles router, header, footer, and all views
 */
import "./styles/main.css";

import { Router } from "./router.js";
import { createHeader } from "./components/Header.js";
import { createFooter } from "./components/Footer.js";

import { createHomeView } from "./views/HomeView.js";
import { createTypingTestView } from "./views/TypingTestView.js";
import { createQuotesView } from "./views/QuotesView.js";
import {
  createCodeTypingOverview,
  createLevelMapView,
  createCodeChallengeView
} from "./views/CodeTypingView.js";
import { createProgressView } from "./views/ProgressView.js";
import { createArticlesView, createArticleDetailView } from "./views/ArticlesView.js";
import { createSettingsView } from "./views/SettingsView.js";
import {
  createAboutView,
  createContactView,
  createPrivacyView,
  createTermsView,
  createNotFoundView
} from "./views/LegalView.js";

import { storage } from "./services/storage.js";

// ── Bootstrap App ──────────────────────────────────────────────────────────
const app = document.getElementById("app");

// Apply saved theme immediately to prevent flash
const savedSettings = storage.getSettings();
document.documentElement.classList.add(savedSettings.theme === "light" ? "light" : "dark");

// Create router first (needed by header/footer)
const router = new Router([]);

// Header
const header = createHeader(router);
app.appendChild(header);

// Main view slot
const main = document.createElement("main");
main.id = "main-view";
app.appendChild(main);

// Footer
const footer = createFooter(router);
app.appendChild(footer);

// ── Route Definitions ──────────────────────────────────────────────────────
router.routes = [
  { pattern: "/", handler: () => createHomeView(router) },

  // Text Typing (Mode A)
  { pattern: "/typing-test", handler: () => createTypingTestView(router) },
  { pattern: /^\/typing-test\/(?<lang>[^/]+)$/, handler: (p) => createTypingTestView(router, p.lang) },

  // Quote Typing (Mode B)
  { pattern: "/quotes", handler: () => createQuotesView(router) },

  // Code Typing (Mode C)
  { pattern: "/code-typing", handler: () => createCodeTypingOverview(router) },
  {
    pattern: /^\/code-typing\/(?<lang>[a-z]+)$/,
    handler: (p) => createLevelMapView(router, p.lang)
  },
  {
    pattern: /^\/code-typing\/(?<lang>[a-z]+)\/level\/(?<level>\d+)\/challenge\/(?<challengeIdx>\d+)$/,
    handler: (p) => createCodeChallengeView(router, p.lang, p.level, p.challengeIdx)
  },

  // Progress dashboard
  { pattern: "/progress", handler: () => createProgressView(router) },

  // Articles
  { pattern: "/articles", handler: () => createArticlesView(router) },
  {
    pattern: /^\/articles\/(?<slug>[^/]+)$/,
    handler: (p) => createArticleDetailView(router, p.slug)
  },

  // Settings
  { pattern: "/settings", handler: () => createSettingsView(router) },

  // Legal & Trust
  { pattern: "/about", handler: () => createAboutView() },
  { pattern: "/contact", handler: () => createContactView() },
  { pattern: "/privacy-policy", handler: () => createPrivacyView() },
  { pattern: "/terms-of-service", handler: () => createTermsView() },

  // 404 fallback
  { pattern: "404", handler: () => createNotFoundView(router) }
];

// ── Handle SPA Navigation ──────────────────────────────────────────────────
// Delegate all <a data-nav> and footer links not already handled in components
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;

  const href = link.getAttribute("href");
  // Only intercept internal links (not external, mailto:, etc.)
  if (href && href.startsWith("/") && !href.startsWith("//")) {
    e.preventDefault();
    router.navigate(href);
  }
});

// ── Start Router ───────────────────────────────────────────────────────────
router.start();
