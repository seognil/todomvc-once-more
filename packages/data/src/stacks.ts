import { StackInfo } from "./types";

const rawData = {
  ts: {
    name: "TypeScript",
    url: "https://www.typescriptlang.org/",
    desc: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
  },
  js: {
    name: "JavaScript",
    url: "https://javascript.info/",
    desc: "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.",
  },
  css: {
    name: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics",
    desc: "CSS (Cascading Style Sheets) is the code that styles web content. CSS basics walks through what you need to get started.",
  },

  react: {
    name: "React",
    url: "https://reactjs.org/",
    desc: "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
  },
  reacthooks: {
    name: "React Hooks",
    url: "https://reactjs.org/docs/hooks-intro.html",
    desc: "Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.",
  },
  recoil: {
    name: "Recoil",
    url: "https://recoiljs.org/",
    desc: "Atoms are units of state. They're updatable and subscribable: when an atom is updated, each subscribed component is re-rendered with the new value. They can be created at runtime, too. Atoms can be used in place of React local component state. If the same atom is used from multiple components, all those components share their state.",
  },

  jotai: {
    name: "Jotai",
    url: "https://jotai.org/",
    desc: "Jotai takes a bottom-up approach to React state management with an atomic model inspired by Recoil. One can build state by combining atoms and renders are optimized based on atom dependency. This solves the extra re-render issue of React context and eliminates the need for the memoization technique.",
  },

  vite: {
    name: "Vite",
    url: "https://vitejs.dev/",
    desc: `Vite (French word for "quick", pronounced /vit/, like "veet") is a build tool that aims to provide a faster and leaner development experience for modern web projects. `,
  },
};

export type StackName = keyof typeof rawData;

const typeCheckOnly = rawData as Record<string, StackInfo>;

export const stacks = rawData as Record<StackName, StackInfo>;
