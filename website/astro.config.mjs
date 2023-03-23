import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), preact(), UnoCSS()],
});
