/**
 * TypeForge Client-Side SPA Router
 * Lightweight hash + pushState router for all TypeForge pages
 */

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentView = null;
    this._onPopState = this._handleNavigation.bind(this);
    window.addEventListener("popstate", this._onPopState);
  }

  start() {
    this._handleNavigation();
  }

  navigate(path) {
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    this._handleNavigation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  _handleNavigation() {
    const path = window.location.pathname;
    const matched = this._matchRoute(path);

    // Close mobile nav drawer if open
    const navLinks = document.querySelector("#main-nav");
    const mobileBackdrop = document.querySelector("#mobile-nav-backdrop");
    if (navLinks) navLinks.classList.remove("mobile-open");
    if (mobileBackdrop) mobileBackdrop.classList.remove("active");

    if (matched) {
      const mainEl = document.querySelector("#main-view");
      if (mainEl) {
        mainEl.innerHTML = "";
        const view = matched.handler(matched.params);
        if (view instanceof HTMLElement) {
          mainEl.appendChild(view);
        } else if (typeof view === "string") {
          mainEl.innerHTML = view;
        }
      }

      // Update document title & SEO metadata if available
      if (matched.title) {
        document.title = matched.title;
      }
      if (matched.description) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", matched.description);
      }

      // Update active nav link
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.dataset.path) {
          if (link.dataset.path === "/" && path === "/") {
            link.classList.add("active");
          } else if (link.dataset.path !== "/" && path.startsWith(link.dataset.path)) {
            link.classList.add("active");
          }
        }
      });
    }
  }

  _matchRoute(path) {
    for (const route of this.routes) {
      if (route.pattern instanceof RegExp) {
        const match = path.match(route.pattern);
        if (match) {
          return { handler: route.handler, params: match.groups || {}, title: route.title, description: route.description };
        }
      } else if (route.pattern === path) {
        return { handler: route.handler, params: {}, title: route.title, description: route.description };
      }
    }
    // Fallback to 404
    const notFoundRoute = this.routes.find(r => r.pattern === "404");
    if (notFoundRoute) return { handler: notFoundRoute.handler, params: {}, title: "404 — Page Not Found | TypeForge", description: "The requested page was not found on TypeForge." };
    return null;
  }
}
