import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin.js";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/maeum-moment/" : "/",
  plugins: [sites(), cloudflare({ viteEnvironment: { name: "server" } })],
});
