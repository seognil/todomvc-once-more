import { MDXProvider } from "@mdx-js/react";
import { components } from "./MdxConfig";

// @ts-ignore
export const Mdx: FC = ({ children }) => <MDXProvider components={components}>{children}</MDXProvider>;
