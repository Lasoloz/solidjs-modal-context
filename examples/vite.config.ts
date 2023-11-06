import path from "path";

import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000
  },
  build: {
    target: "esnext"
  },
  resolve: {
    alias: [
      { find: "@lib", replacement: path.resolve(__dirname, "../src") },
      { find: "@", replacement: path.resolve(__dirname, "./src") }
    ]
  }
});
