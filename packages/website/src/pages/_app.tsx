import "../components/Mdx/CodeStyle.scss";
import "../components/IndexPage/style.scss";
import "../components/ExamplePage/style.scss";
import "uno.css";
import { Mdx } from "../components/Mdx";
import type { AppProps } from "next/app";

export default function ({ Component, pageProps }: AppProps) {
  return (
    <Mdx>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </Mdx>
  );
}
