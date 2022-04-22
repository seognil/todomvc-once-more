import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import mdx from "vite-plugin-mdx";
import preact from "@preact/preset-vite";
import Unocss from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //
    preact(),
    mdx(),
    Unocss({ theme: { colors: { primary: "hsla(220, 80%, 60%, 1)" } } }),
    visualizer({ filename: "./dist/stats.html" }),
  ],
});
