import { StackName } from "./stacks";
import syntaxTypeList from "./syntax-type-list.json";

// * ---------------------------------------------------------------- primitive

export type FullPath = string & {};
export type SubPath = string & {};

export type FileType = string & {};
export type FileName = string & {};
export type BaseName = string & {};
export type ExtName = string & {};

export type CodeSnippet = string & {};

export type LinkUrl = string & {};

export type SyntaxLang = keyof typeof syntaxTypeList;

// * ---------------------------------------------------------------- misc

export interface ClocInfo {
  type: FileType;
  color: string;
  files: number;
  blank: number;
  comment: number;
  code: number;
}

// * ----------------

export type DistType = "JavaScript" | "CSS" | "HTML" | "SourceMap" | "Other";

export interface FileInfo {
  name: SubPath;
  ext: ExtName;
  type: DistType;
  color: string;
  size: number;
  gsize: number;
}

export interface FileTypeSum {
  type: DistType;
  files: number;
  color: string;
  size: number;
  gsize: number;
}

// * ---------------------------------------------------------------- project full statistics

export interface ProjectStatsBasic {
  projRoot: FullPath;
  projName: BaseName;
  distName: BaseName | null;

  cloc: ClocInfo[];
  dist: FileInfo[];
  distTypeSum: FileTypeSum[];
}

export type ProjectStatsRaw = ProjectStatsBasic & {
  meta: ProjectMetaRaw;
};

export type ProjectStatsFull = ProjectStatsBasic & {
  meta: ProjectMetaFull;
};

// * ---------------------------------------------------------------- meta

export interface ProjectMetaRaw {
  title: string;
  desc: string;

  stacks: StackName[];
  core?: StackName[];
  resources?: (StackName | ArticleLink)[];

  article?: string;
}

// * ----------------

export interface ProjectMetaFull {
  title: string;
  desc: string;

  stacks: StackInfo[];
  core: StackInfo[];
  resources: (StackInfo | ArticleLink)[];

  article?: string;
}

// * ----------------

export interface StackInfo {
  name: StackName;
  url: LinkUrl;
  desc: string;
}

export interface ArticleLink {
  title: string;
  url: LinkUrl;
}

// * ---------------------------------------------------------------- layout props

export interface LayoutData {
  backUrl: LinkUrl;
  baseUrl: LinkUrl;
  githubUrl: LinkUrl;
  sourceUrl: LinkUrl;

  stats: ProjectStatsFull;
}
