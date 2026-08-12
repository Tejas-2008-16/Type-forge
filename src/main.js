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
  {
    pattern: "/",
    title: "TypeForge — Type with purpose. Code with confidence.",
    description: "Improve typing speed while learning real programming concepts and syntax across JavaScript, Python, HTML, CSS, C++, Java, and SQL.",
    handler: () => createHomeView(router)
  },

  // Text Typing (Mode A)
  {
    pattern: "/typing-test",
    title: "Typing Speed Test — TypeForge",
    description: "Test and improve your typing speed (WPM) and accuracy with English words, tech terminology, Hindi, Marathi, and sentences.",
    handler: () => createTypingTestView(router)
  },
  {
    pattern: /^\/typing-test\/(?<lang>[^/]+)$/,
    title: "Typing Practice — TypeForge",
    description: "Practice touch typing in your selected language and domain on TypeForge.",
    handler: (p) => createTypingTestView(router, p.lang)
  },

  // Quote Typing (Mode B)
  {
    pattern: "/quotes",
    title: "Quote Typing Practice — TypeForge",
    description: "Type inspiring tech, scientific, and philosophical quotes while improving touch typing speed and rhythm.",
    handler: () => createQuotesView(router)
  },

  // Code Typing (Mode C)
  {
    pattern: "/code-typing",
    title: "Code Learning & Curriculum — TypeForge",
    description: "Master 10 programming languages through structured typing challenges, code explanations, and capstone projects.",
    handler: () => createCodeTypingOverview(router)
  },
  {
    pattern: /^\/code-typing\/(?<lang>[a-z]+)$/,
    title: "Code Curriculum Chapter Map — TypeForge",
    description: "Explore structured programming chapters, code exercises, and capstone projects.",
    handler: (p) => createLevelMapView(router, p.lang)
  },
  {
    pattern: /^\/code-typing\/(?<lang>[a-z]+)\/level\/(?<level>\d+)\/challenge\/(?<challengeIdx>\d+)$/,
    title: "Code Challenge Practice — TypeForge",
    description: "Type actual code syntax, execute your solution in real-time, and read step-by-step code breakdowns.",
    handler: (p) => createCodeChallengeView(router, p.lang, p.level, p.challengeIdx)
  },

  // Progress dashboard
  {
    pattern: "/progress",
    title: "Your Typing & Coding Statistics — TypeForge",
    description: "Track your average WPM, accuracy, completed code levels, personal records, and typing analytics.",
    handler: () => createProgressView(router)
  },

  // Articles
  {
    pattern: "/articles",
    title: "Articles & Developer Guides — TypeForge",
    description: "In-depth articles on developer productivity, touch typing mechanics, keyboard shortcuts, and programming best practices.",
    handler: () => createArticlesView(router)
  },
  {
    pattern: /^\/articles\/(?<slug>[^/]+)$/,
    title: "Developer Article — TypeForge",
    description: "Read developer guides and tutorials on TypeForge.",
    handler: (p) => createArticleDetailView(router, p.slug)
  },

  // Settings
  {
    pattern: "/settings",
    title: "Settings & Customization — TypeForge",
    description: "Customize your typing experience, sound effects, theme preference, and font display.",
    handler: () => createSettingsView(router)
  },

  // Legal & Trust
  {
    pattern: "/about",
    title: "About TypeForge — Purpose-Driven Typing Education",
    description: "Learn about TypeForge's mission to combine touch typing speed with real-world programming education.",
    handler: () => createAboutView()
  },
  {
    pattern: "/contact",
    title: "Contact TypeForge Team",
    description: "Get in touch with the TypeForge team for support, feedback, curriculum suggestions, or press inquiries.",
    handler: () => createContactView()
  },
  {
    pattern: "/privacy-policy",
    title: "Privacy Policy — TypeForge",
    description: "TypeForge's privacy policy outlining zero data tracking, local-only storage, and cookie disclosures.",
    handler: () => createPrivacyView()
  },
  {
    pattern: "/terms-of-service",
    title: "Terms of Service — TypeForge",
    description: "Terms and conditions of use for TypeForge educational software.",
    handler: () => createTermsView()
  },

  // 404 fallback
  {
    pattern: "404",
    title: "404 — Page Not Found | TypeForge",
    description: "The requested page was not found.",
    handler: () => createNotFoundView(router)
  }
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
