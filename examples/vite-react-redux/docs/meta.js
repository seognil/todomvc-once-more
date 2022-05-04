// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + redux (core) + react-redux",
  desc: "State management in the early ages",

  stacks: ["vite", "react-hooks", "redux", "react-redux", "ts", "sass"],

  core: ["redux", "react-redux"],

  resources: ["redux-toolkit"],

  article: readFileSync(join(__dirname, "./article.md"), "utf-8"),
};

module.exports = meta;
