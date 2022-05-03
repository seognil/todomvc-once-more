import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore for tsno
import { materialLight, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";
import React from "react";
import type { FC, ReactElement } from "react";

// * ----------------------------------------------------------------

const ThemeCode: FC = ({ children }) => (
  <SyntaxHighlighter
    language="tsx"
    style={materialLight}
    PreTag={({ children }) => <>{children}</>}
    CodeTag={({ children }) => <code className="theme-code">{children}</code>}
  >
    {children as string}
  </SyntaxHighlighter>
);

const ThemePre: FC = ({ children }) => (
  <SyntaxHighlighter
    language="tsx"
    style={vscDarkPlus}
    PreTag={({ children }) => <pre className="theme-pre">{children}</pre>}
    CodeTag={({ children }) => <code>{children}</code>}
  >
    {(children as ReactElement)?.props?.children ?? children}
  </SyntaxHighlighter>
);

const H2: FC = ({ children }) => {
  const anchor = getAnchor(children as string);
  return (
    <h2 id={anchor}>
      <a href={`#${anchor}`}>{children}</a>
    </h2>
  );
};

const getAnchor = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");

// * ----------------------------------------------------------------

export const components = {
  h2: H2,
  pre: ThemePre,
  code: ThemeCode,
};
