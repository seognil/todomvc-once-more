import type { AppProps } from "next/app";
import "uno.css";
import "../components/ExamplePage/style.scss";
import "../components/IndexPage/style.scss";
import { Mdx } from "../components/Mdx";
import "../components/Mdx/CodeStyle.scss";

export default function ({ Component, pageProps }: AppProps) {
  return (
    <Mdx>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </Mdx>
  );
}
