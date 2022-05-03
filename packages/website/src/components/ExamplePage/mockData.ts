import { LayoutData, stacks } from "@/data";

const coreSnippet = `
import { atom, RecoilRoot, useRecoilState } from "recoil";

const counterAtom = atom({ key: "counter", default: 0 });

const App = () => {
  return (
    <RecoilRoot>
      <Layout />
    </RecoilRoot>
  );
};

const Layout = () => {
  const [count, setCount] = useRecoilState(counterAtom);

  return (
    <div>
      <span>{count}</span>

      <button onClick={() => setCount((e) => e - 1)}> - </button>

      <button onClick={() => setCount((e) => e + 1)}> + </button>
    </div>
  );
};
`.trim();

export const MockData: LayoutData = {
  backUrl: "/",
  baseUrl: "",
  githubUrl: "",

  sourceUrl: "",

  stats: {
    projRoot: "",
    projName: "",
    distName: "",

    cloc: [
      {
        type: "CSS",
        color: "#563d7c",
        files: 2,
        blank: 54,
        comment: 9,
        code: 321,
      },
      {
        type: "TypeScript",
        color: "#2b7489",
        files: 8,
        blank: 64,
        comment: 22,
        code: 237,
      },
    ],
    dist: [
      {
        name: "index.html",
        ext: "html",
        type: "HTML",
        color: "#e34c26",
        size: 455,
        gsize: 301,
      },
      {
        name: "assets/index.68c0ed73.css",
        ext: "css",
        type: "CSS",
        color: "#563d7c",
        size: 5504,
        gsize: 1733,
      },
      {
        name: "assets/index.73b96b4e.js",
        ext: "js",
        type: "JavaScript",
        color: "#f1e05a",
        size: 213802,
        gsize: 68176,
      },
      {
        name: "assets/index.8f46499b8f46499b8f46499b8f46499b8f46499b8f46499b.svg",
        ext: "svg",
        type: "Other",
        color: "#aaa",
        size: 213827,
        gsize: 68191,
      },
      {
        name: "assets/index.8f46499b8f46499b8f46499b8f46499b8f46499b8f46499b.js.map",
        ext: "js.map",
        type: "SourceMap",
        color: "#aaa",
        size: 213827,
        gsize: 68191,
      },
    ],

    distTypeSum: [
      {
        type: "HTML",
        files: 1,
        color: "#e34c26",
        size: 455,
        gsize: 301,
      },
      {
        type: "CSS",
        files: 1,
        color: "#563d7c",
        size: 5504,
        gsize: 1733,
      },
      {
        type: "JavaScript",
        files: 1,
        color: "#f1e05a",
        size: 213802,
        gsize: 68176,
      },
    ],

    meta: {
      title: "React Project",
      desc: "Use several atoms to organize ui state",

      stacks: [stacks.react, stacks.recoil, stacks.ts],

      core: [stacks.recoil],
      usage: {
        lang: "tsx",
        code: ["<RecoilRoot>", "atom()", "selector()", "useRecoilState()"],
        note: "Anim aliquip et cillum eu laboris id consequat. In sit reprehenderit cupidatat adipisicing nulla quis. Nisi quis reprehenderit ad qui quis nisi mollit. Enim minim velit ipsum duis aliquip ex consequat laboris et culpa. Velit magna consectetur anim id.",
        snippet: coreSnippet,
      },
      resources: [stacks.jotai],
    },
  },
};
