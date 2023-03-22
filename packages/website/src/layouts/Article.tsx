import type { FC, PropsWithChildren } from "react";
import React from "react";

export const Article: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <div>
        <span>Hello</span>
        <span>Hello</span>
        <span>Hello</span>
        <span>Hello</span>
        <span>Hello</span>
        <span>Hello</span>
        <span>Hello</span>
        {children}
      </div>
    </>
  );
};
