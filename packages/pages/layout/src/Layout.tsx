import React, { FC, useEffect, useRef } from "react";
import { FaGithubSquare } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { LayoutInfo, stacks } from "../../../utils/data";

// * ----------------------------------------------------------------

export const Layout: FC<{ info?: LayoutInfo; server?: boolean }> = ({ info = MockInfo, server = false }) => {
  return (
    <div className="todomvc-layout">
      <Aside info={info} server={server} />
      <div id="todomvc-inject-app-container"></div>
    </div>
  );
};

const Aside: FC<{ info: LayoutInfo; server: boolean }> = ({ info, server }) => {
  return (
    <aside>
      <div className="nav">
        <a href={info.backUrl}>
          <button type="button">← Back</button>
        </a>

        <a href={info.githubUrl} aria-label="Github Repo">
          <FaGithubSquare />
        </a>
      </div>

      <hr />

      <h1>{info.title}</h1>

      <a className="src" href={info.sourceUrl}>
        <h3>Source</h3>
      </a>

      {info.dist.length > 0 && (
        <>
          <hr />

          <h3>Build Output</h3>

          <table>
            <tbody>
              <tr>
                <th>Files</th>
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
              <tr className="total">
                <td>Total</td>
                <td>{prettySize(info.dist.map((e) => e.size).reduce((a, b) => a + b, 0))}</td>
                <td>{prettySize(info.dist.map((e) => e.gsize).reduce((a, b) => a + b, 0))}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      {info.stacks.length > 0 && (
        <>
          <hr />

          <h3>Stacks</h3>

          <ul className="stacks">
            {info.stacks.map((e) => (
              <li key={e.name}>
                <a href={e.url}>{e.name}</a>
              </li>
            ))}
          </ul>
        </>
      )}

      {info.core.length > 0 && (
        <>
          <hr />

          <h3>Core Concepts</h3>

          {server ? <CodeBlockServer list={info.core} /> : <CodeBlock list={info.core} />}
        </>
      )}

      {info.quotes.length > 0 && (
        <>
          <hr />

          {info.quotes.map((e) => (
            <div key={e.name} className="desc">
              <blockquote>
                <p className="desc-link">
                  <a href={e.url}>{e.name}</a>
                </p>
                <p>{e.desc}</p>
              </blockquote>
            </div>
          ))}
        </>
      )}
    </aside>
  );
};

// * ---------------------------------------------------------------- CodeBlock

const CodeBlock: FC<{ list: string[] }> = ({ list }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    containerRef.current && prettyCodeBlock(containerRef.current);
  }, [list]);
  return (
    <div className="core" ref={containerRef}>
      {list.map((e) => (
        <SyntaxHighlighter key={e} language="tsx" style={materialLight}>
          {e}
        </SyntaxHighlighter>
      ))}
    </div>
  );
};

const CodeBlockServer: FC<{ list: string[] }> = ({ list }) => {
  return (
    <div className="core">
      {list.map((e) => (
        <SyntaxHighlighter key={e} language="tsx" style={materialLight}>
          {e}
        </SyntaxHighlighter>
      ))}
    </div>
  );
};

export const prettyCodeBlock = (root: HTMLElement | null) => {
  const container = root?.classList.contains("core") ? root : root?.querySelector(".core");
  if (!container) return;

  const codeNodes = container.querySelectorAll("code");
  container.innerHTML = "";
  codeNodes.forEach((e) => container.appendChild(e));
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

const MockInfo: LayoutInfo = {
  backUrl: "",
  githubUrl: "",

  title: "React Project",
  sourceUrl: "",

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

  stacks: [stacks.react, stacks.recoil, stacks.ts],
  core: ["<RecoilRoot>", "atom()", "selector()", "useRecoilState()"],

  desc: { short: "Use several atoms to organize ui state", long: "" },
  quotes: [stacks.recoil],
  references: [stacks.recoil],
};
