import { LayoutData, stacks } from "@todo/data";
import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "./Layout";
import "./style.scss";

// * ---------------------------------------------------------------- mock

const MockData: LayoutData = {
  backUrl: "",
  githubUrl: "",

  sourceUrl: "",

  stats: {
    projRoot: "",
    projName: "",
    distName: "",

    cloc: [
      { type: "CSS", files: 2, blank: 54, comment: 9, code: 321 },
      { type: "TypeScript", files: 8, blank: 64, comment: 22, code: 237 },
    ],
    dist: [
      { file: "index.html", size: 453, gsize: 300 },
      { file: "assets/index.53b1ee6e.css", size: 5503, gsize: 1732 },
      { file: "assets/index.8f46499b.js", size: 213827, gsize: 68191 },
      { file: "assets/index.8f46499b8f46499b8f46499b8f46499b8f46499b8f46499b.svg", size: 213827, gsize: 68191 },
      { file: "assets/index.8f46499b8f46499b8f46499b8f46499b8f46499b8f46499b.js.map", size: 213827, gsize: 68191 },
    ],

    meta: {
      title: "React Project",

      stacks: [stacks.react, stacks.recoil, stacks.ts],
      core: ["<RecoilRoot>", "atom()", "selector()", "useRecoilState()"],

      desc: { short: "Use several atoms to organize ui state", long: "" },
      quotes: [stacks.recoil],
      references: [stacks.recoil],
    },
  },
};

// * ---------------------------------------------------------------- dev render

ReactDOM.render(
  <React.StrictMode>
    <Layout data={MockData} />
  </React.StrictMode>,
  document.getElementById("root")!,
);
