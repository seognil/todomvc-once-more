import type { CoreInfo, FileTypeSum, LayoutData } from "@todo/data";
import React, { FC, useEffect, useRef } from "react";
import { FaClone, FaGithub, FaSquare } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const codeTheme = materialLight;
const snippetTheme = vscDarkPlus;

// * ----------------------------------------------------------------

export const Layout: FC<{ data: LayoutData; server?: boolean }> = ({ data, server = false }) => {
  const { stats } = data;
  const { meta } = stats;

  return (
    <div className="todomvc-layout">
      <div className="nav">
        <a href={data.backUrl}>
          <button type="button">← Home</button>
        </a>

        <a href={data.githubUrl} aria-label="Github Repo">
          <FaGithub />
        </a>
      </div>

      <h1>{meta.title}</h1>

      <div className="todomvc-app-container">
        <div className="todomvc-info">
          <p>{meta.desc.short}</p>

          {meta.stacks.length > 0 && (
            <>
              <h2>
                Stacks (<a href={data.sourceUrl}>Source Code</a>)
              </h2>

              <ul>
                {meta.stacks.map((e) => (
                  <li key={e.url}>
                    <a href={e.url}>{e.name}</a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {stats.distTypeSum.length > 0 && (
            <>
              <h2>Build (gzip size)</h2>
              <BuildSizeBlock data={data} />
            </>
          )}
        </div>

        <div id="todomvc-inject-app-container">
          <div style={{ background: "linear-gradient(-45deg, #e66465, #9198e5)", width: "100%", height: "600px" }}>
            PlaceHolder
          </div>
        </div>
      </div>

      <h2>Core Concepts</h2>

      {meta.quotes.length > 0 && (
        <>
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

      <h2>Basic Usage</h2>

      <div>
        {server ? <CodeBlockServer core={meta.core} /> : <CodeBlock core={meta.core} />}

        {[stats.meta.desc.long].flat().map((e, i) => (
          <p key={i}>{e}</p>
        ))}

        <div className="core-snippet">
          <SyntaxHighlighter language={meta.core.lang} style={snippetTheme}>
            {meta.core.snippet}
          </SyntaxHighlighter>
        </div>
      </div>

      <h2>Rescources</h2>

      <ul>
        {stats.meta.resources.map((e) => (
          <li key={e.url}>
            {"name" in e ? (
              <>
                <a href={e.url}>{e.name}</a>
              </>
            ) : (
              <a href={e.url}>{e.title}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// * ---------------------------------------------------------------- Bar

const BuildSizeBlock: FC<{ data: LayoutData }> = ({ data }) => {
  const distTypeSum = data.stats.distTypeSum;
  const gsum = distTypeSum.map((e) => e.gsize).reduce((a, b) => a + b, 0);

  return (
    <div className="todomvc-graph">
      <div className="todomvc-bar">
        <GzipBar files={distTypeSum} />
      </div>

      <div className="todomvc-dist">
        <div>
          {distTypeSum.map((e) => (
            <div key={e.type} className="lang-tag">
              <span>
                <FaSquare style={{ color: e.color }} />
                <b>{e.type}</b>
              </span>

              <span>{prettyKB(e.gsize)}</span>
            </div>
          ))}
        </div>

        <div className="lang-tag dist-total">
          <span>
            <FaClone />
            <b>Total</b>
          </span>

          <span>{prettyKB(gsum)}</span>
        </div>
      </div>
    </div>
  );
};

// * ------------------------------------------------

const GzipBar: FC<{ files: FileTypeSum[] }> = ({ files }) => {
  const gsum = files.map((e) => e.gsize).reduce((a, b) => a + b, 0);

  // * ----------------

  let tmp = 0;
  const gzipData = files.map((e) => {
    const result = { color: e.color, start: tmp / gsum, percent: e.gsize / gsum };
    tmp += e.gsize;
    return result;
  });

  // * ----------------

  return (
    <svg width="100%" height="100%">
      {gzipData.map((e, i) => (
        <rect key={i} y={e.start * 100 + "%"} height={e.percent * 100 + "%"} width="100%" rx="2" fill={e.color} />
      ))}
    </svg>
  );
};

// * ---------------------------------------------------------------- CodeBlock

const CodeBlock: FC<{ core: CoreInfo }> = ({ core }) => {
  const containerRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    containerRef.current && prettyCodeBlock(containerRef.current, document);
  }, [core.code]);
  return (
    <ul className="core-code" ref={containerRef}>
      {core.code.map((e) => (
        <li key={e}>
          <SyntaxHighlighter language={core.lang} style={codeTheme}>
            {e}
          </SyntaxHighlighter>
        </li>
      ))}
    </ul>
  );
};

const CodeBlockServer: FC<{ core: CoreInfo }> = ({ core }) => {
  return (
    <ul className="core-code">
      {core.code.map((e) => (
        <li key={e}>
          <SyntaxHighlighter language={core.lang} style={codeTheme}>
            {e}
          </SyntaxHighlighter>
        </li>
      ))}
    </ul>
  );
};

export const prettyCodeBlock = (root: HTMLElement | null, document: Document) => {
  const container = root?.classList.contains("core-code") ? root : root?.querySelector(".core-code");
  if (!container) return;

  const codeNodes = container.querySelectorAll("code");
  container.innerHTML = "";
  codeNodes.forEach((e) => {
    const li = document.createElement("li");
    li.appendChild(e);
    container.appendChild(li);
  });
};

// * ---------------------------------------------------------------- utils

const prettySize = (size: number) => (size / 1024).toFixed(2);
const prettyKB = (size: number) => `${prettySize(size)} kB`;
