import { spawn } from "child_process";
import { once } from "events";
import path from "path";
import { createIdFromPath, getIsoDateString } from "../utils/string-utils.js";

export class CopyOperation {
  constructor(
    readonly name: string,
    readonly sourcePath: string,
    readonly destinationFolder: string,
  ) {}

  async do() {
    try {
      const assetName = createIdFromPath(this.sourcePath);
      const zipName = `${getIsoDateString()}-${assetName}.zip`;
      const destinationPath = path.join(this.destinationFolder, zipName);

      const child = spawn("zip", ["-r", destinationPath, "."], {
        cwd: this.sourcePath,
      });
      await once(child, "close");

      return { success: true as const };
    } catch {
      return { error: "unknown" as const };
    }
  }
}
