import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import { resolve } from "node:path";
import { sites } from "./build/sites-vite-plugin.js";

const htmlInputs = {
  index: resolve(import.meta.dirname, "index.html"),
  about: resolve(import.meta.dirname, "about.html"),
  methodology: resolve(import.meta.dirname, "methodology.html"),
  privacy: resolve(import.meta.dirname, "privacy.html"),
  contact: resolve(import.meta.dirname, "contact.html"),
};

function multiPageHtml() {
  return {
    name: "multi-page-html",
    configEnvironment(name) {
      if (name !== "client") return;

      return {
        build: {
          rollupOptions: { input: htmlInputs },
        },
      };
    },
  };
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/maeum-moment/" : "/",
  plugins: [
    multiPageHtml(),
    sites(),
    cloudflare({ viteEnvironment: { name: "server" } }),
  ],
});
