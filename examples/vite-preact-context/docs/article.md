## Basic Usage

- `import { render } from "preact"`
- `import type { FunctionalComponent as FC } from "preact"`
- `import { useState } from "preact/compat"`

Preact is a tiny React alternative. And It works well with most libraries of the React ecosystem which built on the top of React Hooks.

With universal CLI such as Vite, preact support is out of the box.

And if from an existing project, you can also easily replace React with Preact to reduce app's build size in minitus.

```tsx
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
```
