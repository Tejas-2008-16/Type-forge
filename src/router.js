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
      // Update active nav link
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.dataset.path && path.startsWith(link.dataset.path)) {
          link.classList.add("active");
        }
      });
    }
  }

  _matchRoute(path) {
    for (const route of this.routes) {
      if (route.pattern instanceof RegExp) {
        const match = path.match(route.pattern);
        if (match) {
          return { handler: route.handler, params: match.groups || {} };
        }
      } else if (route.pattern === path) {
        return { handler: route.handler, params: {} };
      }
    }
    // Fallback to 404
    const notFoundRoute = this.routes.find(r => r.pattern === "404");
    if (notFoundRoute) return { handler: notFoundRoute.handler, params: {} };
    return null;
  }
}
