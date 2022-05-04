// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "Replacing React with Preact",
  desc: "Preact is a fast 3kB alternative to React with the same modern API",

  stacks: ["vite", "preact", "ts", "sass"],

  core: ["preact"],

  resources: [
    {
      title: "Switching to Preact (from React)",
      url: "https://preactjs.com/guide/switching-to-preact",
    },
    {
      title: "Differences to React",
      url: "https://preactjs.com/guide/differences-to-react/",
    },
  ],

  article: readFileSync(join(__dirname, "./article.md"), "utf-8"),
};

module.exports = meta;
