import { LayoutData } from "@todo/data";
import React, { FC, useEffect, useRef } from "react";
import { FaGithubSquare } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

// * ----------------------------------------------------------------

export const Layout: FC<{ data: LayoutData; server?: boolean }> = ({ data, server = false }) => {
  return (
    <div className="todomvc-layout">
      <Aside data={data} server={server} />
      <div id="todomvc-inject-app-container"></div>
    </div>
  );
};

const Aside: FC<{ data: LayoutData; server: boolean }> = ({ data, server }) => {
  const { stats } = data;
  const { meta } = stats;

  return (
    <aside>
      <div className="nav">
        <a href={data.backUrl}>
          <button type="button">← Back</button>
        </a>

        <a href={data.githubUrl} aria-label="Github Repo">
          <FaGithubSquare />
        </a>
      </div>

      <hr />

      <h1>{meta.title}</h1>

      <a className="src" href={data.sourceUrl}>
        <h3>Source</h3>
      </a>

      {stats.dist.length > 0 && (
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
              {stats.dist.map((e) => (
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
                <td>{prettySize(stats.dist.map((e) => e.size).reduce((a, b) => a + b, 0))}</td>
                <td>{prettySize(stats.dist.map((e) => e.gsize).reduce((a, b) => a + b, 0))}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      {meta.stacks.length > 0 && (
        <>
          <hr />

          <h3>Stacks</h3>

          <ul className="stacks">
            {meta.stacks.map((e) => (
              <li key={e.name}>
                <a href={e.url}>{e.name}</a>
              </li>
            ))}
          </ul>
        </>
      )}

      {meta.core.length > 0 && (
        <>
          <hr />

          <h3>Core Concepts</h3>

          {server ? <CodeBlockServer list={meta.core} /> : <CodeBlock list={meta.core} />}
        </>
      )}

      {meta.quotes.length > 0 && (
        <>
          <hr />

          {meta.quotes.map((e) => (
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
        // @ts-ignore
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
        // @ts-ignore
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
