import { LayoutData } from "@todo/data";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import type { FC } from "react";
import React from "react";
import { components } from "./MdxConfig";

// * ----------------------------------------------------------------

export const parseMd = async (data: LayoutData) => {
  const md = data.stats.meta.article;
  return md ? await serialize(md) : null;
};

export type { MDXRemoteSerializeResult };

export const MdxRemote: FC<{ source: MDXRemoteSerializeResult }> = ({ source }) => (
  // @ts-ignore
  <MDXRemote {...source} components={components} />
);
