import React from "react";
import { renderToString } from "react-dom/server";

import { ExamplePage } from "../components/ExamplePage";
import type { ExamplePageProps } from "../components/ExamplePage";

export const renderExampleLayout = (props: ExamplePageProps) => renderToString(<ExamplePage {...props} />);

export type { ExamplePageProps };

export { parseMd } from "../components/Mdx/MdxRemote";
