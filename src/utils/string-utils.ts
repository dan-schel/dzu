import { itsOk, kebabify } from "@dan-schel/js-utils";
import path from "path";

export function getIsoDateString(): string {
  return itsOk(new Date().toISOString().split("T")[0]);
}

export function createIdFromPath(inputPath: string) {
  return kebabify(path.basename(inputPath));
}
