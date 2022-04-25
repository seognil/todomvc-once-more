// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + RxJS + observable-hooks",
  desc: "ReactiveX is an API for asynchronous programming with observable streams",

  stacks: ["vite", "react-hooks", "rxjs", "observable-hooks", "ts", "sass"],

  core: ["rxjs", "observable-hooks"],

  usage: {
    lang: "tsx",
    code: [
      "new BehaviorSubject()",
      "Observable.pipe()",
      "Observable.subscribe()",
      "BehaviorSubject.value",
      "BehaviorSubject.next()",
      `import { map, switchMap } from "rxjs/operators"`,
      `import { useObservableEagerState } from "observable-hooks"`,
    ],
    note: [
      "Like Mobx, RxJS's core concept is Observable/Observer. But RxJS's value shines in stream programming by provides tons of additional API (`rxjs/operators`). On the other hand, the cost is the steep learning curve.",
      "So although you can use an object called `BehaviorSubject` which allows you to emit values manually to just implement react state management, I think it's maybe an overkill.",
    ],
    snippet: readFileSync(join(__dirname, "./concepts.tsx"), "utf-8"),
  },

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
};

module.exports = meta;
