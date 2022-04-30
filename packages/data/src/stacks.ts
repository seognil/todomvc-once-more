import { StackInfo } from "./types";

const rawData = {
  "ts": {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    desc: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
  },
  "js": {
    name: "JavaScript",
    url: "https://javascript.info/",
    desc: "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.",
  },
  "css": {
    name: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics",
    desc: "CSS (Cascading Style Sheets) is the code that styles web content. CSS basics walks through what you need to get started.",
  },

  // * ----------------

  "sass": {
    name: "Sass",
    url: "https://sass-lang.com/",
    desc: "Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.",
  },

  // * ----------------

  "react": {
    name: "React",
    url: "https://reactjs.org/",
    desc: "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
  },
  "preact": {
    name: "Preact",
    url: "https://preactjs.com/",
    desc: "Preact is not intended to be a reimplementation of React. There are differences. Many of these differences are trivial, or can be completely removed by using preact/compat, which is a thin layer over Preact that attempts to achieve 100% compatibility with React.",
  },
  "react-hooks": {
    name: "React Hooks",
    url: "https://reactjs.org/docs/hooks-intro.html",
    desc: "Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. Hooks solve a wide variety of seemingly unconnected problems in React that we’ve encountered over five years of writing and maintaining tens of thousands of components.",
  },

  "svelte": {
    name: "Svelte",
    url: "https://svelte.dev/",
    desc: "Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.",
  },
  "svelte-kit": {
    name: "@sveltejs/kit",
    url: "https://kit.svelte.dev/",
    desc: "SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.",
  },

  "solid": {
    name: "Solid.js",
    url: "https://www.solidjs.com/",
    desc: "Solid follows the same philosophy as React with unidirectional data flow, read/write segregation, and immutable interfaces. It however has a completely different implementation that forgoes using a Virtual DOM.",
  },

  "vue3": {
    name: "Vue 3",
    url: "https://vuejs.org/",
    desc: "Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.",
  },
  "pinia": {
    name: "Pinia",
    url: "https://pinia.vuejs.org/",
    desc: "Pinia started as an experiment to redesign what a Store for Vue could look like with the Composition API around November 2019. Since then, the initial principles are still the same, but Pinia works for both Vue 2 and Vue 3 and doesn't require you to use the composition API. The API is the same for both except for installation and SSR, and these docs are targeted to Vue 3 with notes about Vue 2 whenever necessary so it can be read by Vue 2 and Vue 3 users!",
  },

  // * ----------------

  "redux": {
    name: "redux (core)",
    url: "https://redux.js.org/",
    desc: "Centralizing your application's state and logic enables powerful capabilities like undo/redo, state persistence, and much more.",
  },
  "redux-toolkit": {
    name: "@reduxjs/toolkit",
    url: "https://redux-toolkit.js.org/",
    desc: `Includes utilities to simplify common use cases like store setup, creating reducers, immutable update logic, and more. Takes inspiration from libraries like Immer and Autodux to let you write "mutative" immutable update logic, and even create entire "slices" of state automatically.`,
  },
  "react-redux": {
    name: "react-redux",
    url: "https://react-redux.js.org/",
    desc: "React Redux is maintained by the Redux team, and kept up-to-date with the latest APIs from Redux and React.",
  },

  "mobx": {
    name: "MobX",
    url: "https://mobx.js.org/",
    desc: `Anything that can be derived from the application state, should be, Automatically. MobX is a battle tested library that makes state management simple and scalable by transparently applying functional reactive programming (TFRP).`,
  },
  "mobx-react-lite": {
    name: "mobx-react-lite",
    url: "https://mobx.js.org/react-integration.html",
    desc: "`mobx-react-lite` is a lighter version of `mobx-react` which supports React functional components only and as such makes the library slightly faster and smaller (only 1.5kB gzipped).",
  },
  "immer": {
    name: "Immer",
    url: "https://immerjs.github.io/immer/",
    desc: "Immer can be used in any context in which immutable data structures need to be used. For example in combination with React state, React or Redux reducers, or configuration management. Immutable data structures allow for (efficient) change detection: if the reference to an object didn't change, the object itself did not change. In addition, it makes cloning relatively cheap: Unchanged parts of a data tree don't need to be copied and are shared in memory with older versions of the same state.",
  },

  "rxjs": {
    name: "RxJS",
    url: "https://rxjs.dev/",
    desc: "RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.",
  },
  "observable-hooks": {
    name: "observable-hooks",
    url: "https://observable-hooks.js.org/",
    desc: "React hooks for RxJS Observables.",
  },

  "recoil": {
    name: "Recoil",
    url: "https://recoiljs.org/",
    desc: "Atoms are units of state. They're updatable and subscribable: when an atom is updated, each subscribed component is re-rendered with the new value. They can be created at runtime, too. Atoms can be used in place of React local component state. If the same atom is used from multiple components, all those components share their state.",
  },
  "jotai": {
    name: "Jotai",
    url: "https://jotai.org/",
    desc: "Jotai takes a bottom-up approach to React state management with an atomic model inspired by Recoil. One can build state by combining atoms and renders are optimized based on atom dependency. This solves the extra re-render issue of React context and eliminates the need for the memoization technique.",
  },

  // * ----------------

  "vite": {
    name: "Vite",
    url: "https://vitejs.dev/",
    desc: `Vite (French word for "quick", pronounced /vit/, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects.`,
  },
};

export type StackName = keyof typeof rawData;

const typeCheckOnly = rawData as Record<string, StackInfo>;

export const stacks = rawData as Record<StackName, StackInfo>;
