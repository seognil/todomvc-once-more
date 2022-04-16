import type { FC } from "react";
import React from "react";

// * ----------------------------------------------------------------

export interface LayoutInfo {
  backUrl: string;
  sourceUrl: string;

  title: string;
  dist: FileInfo[];
  stacks: StackInfo[];
  desc: StackInfo[];
}

export interface StackInfo {
  name: string;
  homepage: string;
  desc: string;
}

export interface FileInfo {
  file: string;
  size: number;
  gsize: number;
}

// * ----------------------------------------------------------------

export const Layout: FC<{ info?: LayoutInfo }> = ({ info = MockInfo }) => {
  return (
    <div className="todomvc-layout">
      <Aside info={info} />
      <div id="todomvc-inject-app-container"></div>
    </div>
  );
};

const Aside: FC<{ info: LayoutInfo }> = ({ info }) => {
  return (
    <aside>
      <a className="back" href={info.backUrl}>
        <button type="button">← Back</button>
      </a>

      <hr />

      <h1>{info.title}</h1>

      <a className="src" href={info.sourceUrl}>
        <h3>Source</h3>
      </a>

      <hr />

      <h3>Build Output</h3>

      <table>
        <tbody>
          <tr>
            <th>file</th>
            <th>size</th>
            <th>gzip</th>
          </tr>
          {info.dist.map((e) => (
            <tr key={e.file}>
              <td>
                <PrettyPath path={e.file} />
              </td>
              <td>{prettySize(e.size)}</td>
              <td>{prettySize(e.gsize)}</td>
            </tr>
          ))}
          <tr className="sum">
            <td>Sum</td>
            <td>{prettySize(info.dist.map((e) => e.size).reduce((a, b) => a + b, 0))}</td>
            <td>{prettySize(info.dist.map((e) => e.gsize).reduce((a, b) => a + b, 0))}</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h3>Stacks</h3>

      <ul className="stacks">
        {info.stacks.map((e) => (
          <li key={e.name}>
            <a href={e.homepage}>{e.name}</a>
          </li>
        ))}
      </ul>

      <hr />

      {info.desc.map((e) => (
        <div key={e.name} className="desc">
          <blockquote>
            <p className="desc-link">
              <a href={e.homepage}>{e.name}</a>
            </p>
            <p>{e.desc}</p>
          </blockquote>
        </div>
      ))}
    </aside>
  );
};

// * ---------------------------------------------------------------- utils

const PrettyPath: FC<{ path: string }> = ({ path }) => {
  const max = 32;
  const ext = path.match(/(?<=(\.))\w+(\.map)?$/)?.[0] ?? "";

  const shorten = path.length > max ? `${path.slice(0, max - ext.length - 6)}~${path.slice(-(ext.length + 5))}` : path;

  const cls = /\.map$/.test(ext) ? "source" : { js: "js", css: "css", html: "html" }[ext] ?? "asset";

  return <span className={`file-${cls}`}>{shorten}</span>;
};

const prettySize = (size: number) => `${(size / 1024).toFixed(2)} kB`;

// * ---------------------------------------------------------------- mock

const libs: Record<string, StackInfo> = {
  react: {
    name: "React",
    homepage: "https://reactjs.org/",
    desc: "",
  },
  recoil: {
    name: "Recoil",
    homepage: "https://recoiljs.org/",
    desc: "Atoms are units of state. They're updatable and subscribable: when an atom is updated, each subscribed component is re-rendered with the new value. They can be created at runtime, too. Atoms can be used in place of React local component state. If the same atom is used from multiple components, all those components share their state.",
  },
  ts: {
    name: "TypeScript",
    homepage: "https://www.typescriptlang.org/",
    desc: "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
  },
};

const MockInfo: LayoutInfo = {
  backUrl: "",
  sourceUrl: "",
  title: "React Project",
  dist: [
    {
      file: "index.html",
      size: 453,
      gsize: 300,
    },
    {
      file: "assets/index.53b1ee6e.css",
      size: 5503,
      gsize: 1732,
    },
    {
      file: "assets/index.8f46499b.js",
      size: 213827,
      gsize: 68191,
    },
    {
      file: "assets/index.8f46499b8f46499b8f46499b8f46499b8f46499b8f46499b.svg",
      size: 213827,
      gsize: 68191,
    },
    {
      file: "assets/index.8f46499b.js.map",
      size: 213827,
      gsize: 68191,
    },
  ],
  stacks: [libs.react, libs.recoil, libs.ts],
  desc: [libs.recoil, libs.ts],
};
