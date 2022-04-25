// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + Mobx + mobx-react-lite",
  desc: "Simple, scalable state management with observable values",

  stacks: ["vite", "react-hooks", "mobx", "mobx-react-lite", "ts", "sass"],

  core: ["mobx", "mobx-react-lite"],

  usage: {
    lang: "tsx",
    code: ["observable()", "observable.box()", "computed()", "action()", "autorun()", "observer()"],
    note: [
      "Important aspect of MobX state is its mutability. On the contrary of popular solutions like Redux or useReducer which works best with immutable data structures, the MobX is based on direct mutability to notify any subscribers about the change.",
      "Notice: By default, MobX uses proxies to make arrays and plain objects observable. Proxies provide the best performance and most consistent behavior across environments. However, if you are targeting an environment that doesn't support proxies, proxy support has to be disabled. Most notably this is the case when targeting Internet Explorer or React Native without using the Hermes engine.",
    ],
    snippet: readFileSync(join(__dirname, "./concepts.tsx"), "utf-8"),
  },

  resources: [
    {
      title: "Awesome MobX",
      url: "https://github.com/mobxjs/awesome-mobx",
    },
    {
      title: "Ten minute introduction to MobX and React",
      url: "https://mobx.js.org/getting-started.html",
    },
    {
      title: "Managing Complex States in React with MobX — An Introduction",
      url: "https://codeburst.io/managing-complex-states-in-react-with-mobx-an-introduction-23a659c73e28",
    },
    {
      title: "MobX-State-Tree",
      url: "https://mobx-state-tree.js.org/",
    },
    "immer",
  ],
};

module.exports = meta;
