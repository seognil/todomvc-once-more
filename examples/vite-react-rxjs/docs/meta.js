// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + RxJS + observable-hooks",
  desc: "ReactiveX is an API for asynchronous programming with observable streams",

  stacks: ["vite", "react-hooks", "rxjs", "observable-hooks", "ts", "sass"],

  core: ["rxjs", "observable-hooks"],

  resources: [
    {
      title: "Learn RxJS",
      url: "https://www.learnrxjs.io/",
    },
    {
      title: "Launchpad for RxJS",
      url: "https://reactive.how/rxjs/",
    },
    {
      title: "RxJS Marbles",
      url: "https://rxmarbles.com/",
    },
    {
      title: "The introduction to Reactive Programming you've been missing",
      url: "https://gist.github.com/staltz/868e7e9bc2a7b8c1f754",
    },
  ],

  article: readFileSync(join(__dirname, "./article.md"), "utf-8"),
};

module.exports = meta;
