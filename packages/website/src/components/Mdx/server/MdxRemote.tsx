import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";
import type { FC } from "react";
import { components } from "../MdxConfig";

export const parseMd = async (str: string) => serialize(str);

export const MdxRemote: FC<{ source: MDXRemoteSerializeResult }> = ({ source }) => (
  // @ts-ignore
  <MDXRemote {...source} components={components} />
);
