// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + React Context",
  desc: "React without any third-party state management libraries",

  stacks: ["vite", "react-hooks", "ts", "sass"],

  core: ["vite", "react-hooks"],

  resources: [
    {
      title: "How Are Function Components Different from Classes?",
      url: "https://overreacted.io/how-are-function-components-different-from-classes/",
    },
    {
      title: "React as a UI Runtime",
      url: "https://overreacted.io/react-as-a-ui-runtime/",
    },
  ],

  article: readFileSync(join(__dirname, "./article.md"), "utf-8"),
};

module.exports = meta;
