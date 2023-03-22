import type { FC, PropsWithChildren, ReactElement, ReactNode, ReactText } from "react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-ignore for tsno
import { materialLight, vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";

// * ----------------------------------------------------------------

const ThemeCode: FC<PropsWithChildren<{}>> = ({ children }) => (
  <SyntaxHighlighter
    language="tsx"
    style={materialLight}
    PreTag={({ children }) => <>{children}</>}
    CodeTag={({ children }) => <code className="theme-code">{children}</code>}
  >
    {children as string}
  </SyntaxHighlighter>
);

const ThemePre: FC<PropsWithChildren<{}>> = ({ children }) => (
  <SyntaxHighlighter
    language="tsx"
    style={vscDarkPlus}
    PreTag={({ children }) => <pre className="theme-pre">{children}</pre>}
    CodeTag={({ children }) => <code>{children}</code>}
  >
    {(children as ReactElement)?.props?.children ?? children}
  </SyntaxHighlighter>
);

export const H2: FC<{ anchor?: string; children: ReactText } | { anchor: string; children: ReactNode }> = ({
  children,
  anchor,
}) => {
  const anchorStr = getAnchor(anchor ?? (children as string));
  return (
    <h2 id={anchorStr}>
      <a href={`#${anchorStr}`}>#</a>
      {children}
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
