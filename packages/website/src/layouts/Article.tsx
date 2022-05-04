import type { FC } from "react";
import React from "react";

export const Article: FC = ({ children }) => {
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
