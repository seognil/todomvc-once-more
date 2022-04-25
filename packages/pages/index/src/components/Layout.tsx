// @ts-ignore
import { MDXProvider } from "@mdx-js/preact";
import { githubUrl } from "@todo/data";
import clsx from "clsx";
import type { FunctionalComponent as FC } from "preact";
import { FaGithub } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";
import { FiActivity } from "react-icons/fi";
import Md from "./article.md";
import { ProjBlock } from "./ProjBlock";

// * ================================================================================

export const Layout: FC = () => {
  return (
    <div className="flex flex-col m-auto px-32px max-w-1080px min-h-screen">
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
          <LinkBtn href="#projects-react">
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
        <ProjBlock />

        <MDXProvider components={{ h2: H2 }}>
          <Md />
        </MDXProvider>
      </main>

      <footer className="shrink-0 h-56px flex justify-center items-center">
        <span className="font-thin">MIT Licensed | Copyright © 2022-PRESENT seognil</span>
      </footer>
    </div>
  );
};

// * ----------------------------------------------------------------

const LinkBtn: FC<{ variant?: "contained" | "outlined"; href: string }> = ({
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

// * ----------------------------------------------------------------

// * ---------------------------------------------------------------- utils

const H2: FC = ({ children }) => {
  const anchor = getAnchor(children as string);
  return (
    <h2 id={anchor}>
      <a href={`#${anchor}`}>{children}</a>
    </h2>
  );
};

const getAnchor = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
