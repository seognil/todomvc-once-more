import { StackName } from "./stacks";

// * ---------------------------------------------------------------- primitive

export type FullPath = string & {};
export type SubPath = string & {};

export type FileType = string & {};
export type BaseName = string & {};
export type ExtName = string & {};

export type CodeSnippet = string & {};

export type LinkUrl = string & {};

// * ---------------------------------------------------------------- misc

export interface ClocInfo {
  type: FileType;
  files: number;
  blank: number;
  comment: number;
  code: number;
}

export interface FileInfo {
  size: number;
  gsize: number;
  file: SubPath;
}

export interface StackInfo {
  name: StackName;
  url: LinkUrl;
  desc: string;
}

export interface ArticleLink {
  title: string;
  url: LinkUrl;
}

// * ---------------------------------------------------------------- project full statistics

export interface ProjectStatsBasic {
  projRoot: FullPath;
  projName: BaseName;
  distName: BaseName | null;

  cloc: ClocInfo[];
  dist: FileInfo[];
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

  stacks: StackName[];
  core?: CodeSnippet[];

  desc: Description;
  quotes: StackName[];
  references: (StackName | ArticleLink)[];
}

export interface ProjectMetaFull {
  title: string;

  stacks: StackInfo[];
  core: CodeSnippet[];

  desc: Description;
  quotes: StackInfo[];
  references: (StackInfo | ArticleLink)[];
}

export interface Description {
  short: string;
  long: string;
}

// * ---------------------------------------------------------------- layout props

export interface LayoutData {
  backUrl: LinkUrl;
  githubUrl: LinkUrl;
  sourceUrl: LinkUrl;

  stats: ProjectStatsFull;
}
