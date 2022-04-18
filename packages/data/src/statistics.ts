import json from "../dist/data.json";
import { ProjectStatistics } from "./types";

export const DIR_ROOT = json.root;
export const statistics = json.statistics as ProjectStatistics[];
