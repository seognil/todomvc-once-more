import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";
import type { FC } from "react";
import { components } from "./MdxConfig";
import { LayoutData, ProjectStatsFull } from "@todo/data";

// * ----------------------------------------------------------------

export const parseMd = async (data: LayoutData) => {
  const md = data.stats.meta.markdown;
  return md ? await serialize(md) : null;
};

export type { MDXRemoteSerializeResult };

export const MdxRemote: FC<{ source: MDXRemoteSerializeResult }> = ({ source }) => (
  // @ts-ignore
  <MDXRemote {...source} components={components} />
);
