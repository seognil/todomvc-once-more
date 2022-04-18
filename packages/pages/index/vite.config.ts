import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import Unocss from "unocss/vite";
import mdx from "vite-plugin-mdx";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [
    //
    preact(),
    mdx(),
    Unocss({ theme: { colors: { primary: "hsla(220, 80%, 60%, 1)" } } }),
  ],
});
