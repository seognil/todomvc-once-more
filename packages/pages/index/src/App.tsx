import { githubUrl, ProjectStatsFull, stats } from "@todo/data";
import type { FunctionalComponent as FC } from "preact";
import { FaGithub } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";
// @ts-ignore
import { MDXProvider } from "@mdx-js/preact";
import Md from "./article.md";

// * ================================================================================

export const App: FC = () => {
  return (
    <div className="flex flex-col m-auto px-32px max-w-1080px min-h-screen">
      <header className="shrink-0 flex justify-between text-center my-80px">
        <h1 className="inline-flex items-center text-5em">
          <FcTodoList className="m-8px" />
          <span>TodoMVC</span>
          <small className="self-end text-0.5em -rotate-12 font-thin">once more</small>
        </h1>

        <div className="inline-flex items-center">
          <a
            className="flex items-center text-black no-underline py-8px px-16px border-2 rounded-8px"
            href={githubUrl}
            aria-label="View on GitHub"
          >
            <FaGithub className="mr-8px text-40px" />
            <div className="flex flex-col">
              <span>View project on</span>
              <span className="text-1.75em">GitHub</span>
            </div>
          </a>
        </div>
      </header>

      <main className="flex-1 pb-80px">
        <h2 id="projects">
          <a href="#projects">Projects</a>
        </h2>

        <ul className="list-none p-0">
          {stats.map((e) => (
            <li key={e.projName}>
              <ProjListBlock p={e} />
            </li>
          ))}
        </ul>

        <article>
          <MDXProvider components={{ h2: H2 }}>
            <Md />
          </MDXProvider>
        </article>
      </main>

      <footer className="shrink-0 h-56px flex justify-center items-center">
        <span className="font-thin">MIT Licensed | Copyright © 2022-PRESENT seognil</span>
      </footer>
    </div>
  );
};

// * ----------------------------------------------------------------

const ProjListBlock: FC<{ p: ProjectStatsFull }> = ({ p }) => {
  console.log("lcdebug eaddfe", p);
  return (
    <div>
      <a href={`./${p.projName}`}>{p.meta.title}</a>
    </div>
  );
};

// * ----------------------------------------------------------------

const getAnchor = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");

const H2: FC = ({ children }) => {
  const anchor = getAnchor(children as string);
  return (
    <h2 id={anchor}>
      <a href={`#${anchor}`}>{children}</a>
    </h2>
  );
};
