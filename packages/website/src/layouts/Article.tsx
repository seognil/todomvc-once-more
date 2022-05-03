import React from "react";
import type { FC } from "react";

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
