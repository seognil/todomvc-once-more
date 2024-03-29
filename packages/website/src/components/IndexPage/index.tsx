import { githubUrl } from "@/data";
import clsx from "clsx";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { FaGithub } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";
import { FiActivity } from "react-icons/fi";
import { Mdx } from "../Mdx";
import { H2 } from "../Mdx/MdxConfig";
import Article from "./article.md";
import { ProjBlock } from "./ProjBlock";

// * ================================================================================

export const Index: FC = () => {
  return (
    <div className="flex flex-col m-auto px-32px max-w-1080px min-h-screen">
      <Head>
        <title>TodoMVC once more</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <header className="shrink-0 my-80px flex flex-col items-center">
        <div className="text-center">
          <FcTodoList className="text-240px" />
        </div>
        <div className="relative flex">
          <h1 className="text-5em m-0 leading-1em text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
            TodoMVC
          </h1>
          <span className="absolute left-90% bottom-80% text-30px whitespace-nowrap rotate-12 font-thin opacity-40">
            once more
          </span>
        </div>

        <p className="text-1.25em opacity-60">Modern Frontend Development Practices</p>

        <div className="inline-flex items-center">
          <LinkBtn href="#conclusions">
            <FiActivity className="mr-8px text-1.2em" />
            <span>Get Started</span>
          </LinkBtn>

          <LinkBtn variant="outlined" href={githubUrl}>
            <FaGithub className="mr-8px text-1.4em" />
            <span>On GitHub</span>
          </LinkBtn>
        </div>
      </header>

      <main className="flex-1 pb-80px">
        <H2 anchor="conclusions">Conclusions (WIP)</H2>

        <li>MVX: How to write a Web App with any framework (WIP)</li>

        <ProjBlock />

        <Mdx>
          <Article />
        </Mdx>
      </main>

      <footer className="shrink-0 h-56px flex justify-center items-center">
        <span className="font-thin">MIT Licensed | Copyright © 2022-PRESENT seognil</span>
      </footer>
    </div>
  );
};

// * ----------------------------------------------------------------

const LinkBtn: FC<PropsWithChildren<{ variant?: "contained" | "outlined"; href: string }>> = ({
  variant = "contained",
  href,
  children,
}) => {
  return (
    <a
      className={clsx(
        "no-underline inline-flex justify-center items-center w-160px h-40px m-16px rounded-6px border-2px border-sky-500 font-bold opacity-60 hover:opacity-80 duration-100",
        variant === "contained" ? "bg-sky-500 text-white" : "text-sky-500",
      )}
      href={href}
    >
      {children}
    </a>
  );
};
