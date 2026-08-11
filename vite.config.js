import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  // Support SPA routing for all paths → serve index.html
  appType: "spa"
});
