import type { FileTypeSum, LayoutData } from "@/data";
import React, { FC } from "react";
import { FaClone, FaGithub, FaSquare } from "react-icons/fa";
import { MdxRemote, MDXRemoteSerializeResult } from "../Mdx/MdxRemote";

// * ----------------------------------------------------------------

export interface ExamplePageProps {
  data: LayoutData;
  mdx: MDXRemoteSerializeResult | null;
}

export const ExamplePage: FC<ExamplePageProps> = ({ data, mdx }) => {
  const { stats } = data;

  const { title, desc, stacks } = stats.meta;

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

      <h1>{title}</h1>

      <p>{desc}</p>

      <div className="todomvc-app-container">
        <div className="todomvc-info">
          {stacks.length > 0 && (
            <>
              <h2>
                Stacks (<a href={data.sourceUrl}>Source Code</a>)
              </h2>

              <ul>
                {stacks.map((e) => (
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

      {mdx && <MdxRemote source={mdx} />}
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

// * ---------------------------------------------------------------- utils

const prettySize = (size: number) => (size / 1024).toFixed(2);
const prettyKB = (size: number) => `${prettySize(size)} kB`;
