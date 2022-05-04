// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + Mobx + mobx-react-lite",
  desc: "Simple, scalable state management with observable values",

  stacks: ["vite", "react-hooks", "mobx", "mobx-react-lite", "ts", "sass"],

  core: ["mobx", "mobx-react-lite"],

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

  article: readFileSync(join(__dirname, "./article.md"), "utf-8"),
};

module.exports = meta;
