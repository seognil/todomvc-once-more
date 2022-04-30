// * ---------------- Replacing import using preact (or by setting alias)

// import { render } from "react-dom";
import { render } from "preact";

// import type { FC } from "react";
import type { FunctionalComponent as FC } from "preact";

// import { createContext, useContext, useState } from "react";
import { createContext, useContext, useState } from "preact/compat";

// * ---------------- and tweak your build config

// * e.g. vite has preact support out of the box

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
});

// * ---------------- tsconfig.json

const tsconfigJson = {
  compilerOptions: {
    jsx: "preserve",
    jsxFactory: "h",
    jsxFragmentFactory: "Fragment",
  },
};
