// @ts-check

const { readFileSync } = require("fs");
const { join } = require("path");

/** @type import('../../../packages/data/src').ProjectMetaRaw */
const meta = {
  title: "React Hooks + RxJS + observable-hooks",
  desc: "ReactiveX is an API for asynchronous programming with observable streams",

  stacks: ["vite", "react-hooks", "rxjs", "observable-hooks", "ts", "sass"],

  core: ["rxjs", "observable-hooks"],

  usage: {
    lang: "tsx",
    code: [
      "class Observable",
      "Observable.pipe()",
      "Observable.subscribe()",
      "new BehaviorSubject()",
      "BehaviorSubject.value",
      "BehaviorSubject.next()",
      `import { map, switchMap } from "rxjs/operators"`,
      `import { useObservableEagerState } from "observable-hooks"`,
    ],
    note: [
      "Like Mobx, RxJS's core concept is Observable/Observer. But RxJS shines in stream programming by provides tons of additional APIs (`rxjs/operators`). On the other hand, the cost is the steep learning curve.",
      "So although you can implement state management by using an object called `BehaviorSubject` which allows you to emit values manually. It's maybe an overkill.",
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
