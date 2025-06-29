import { spawn } from "child_process";
import { once } from "events";
import path from "path";
import { JustDate } from "../utils/just-date.js";
import type { Asset } from "../config/asset.js";
import type { Store } from "../config/store.js";

export class CopyOperation {
  constructor(
    private readonly _date: JustDate,
    private readonly _asset: Asset,
    private readonly _store: Store,
  ) {}

  async do() {
    try {
      const zipName = `${this._date.toIso()}-${this._asset.name}.zip`;
      const destinationPath = path.join(this._store.path, zipName);

      const child = spawn("zip", ["-r", destinationPath, "."], {
        cwd: this._asset.path,
      });
      await once(child, "close");

      return { success: true as const };
    } catch {
      return { error: "unknown" as const };
    }
  }

  get name() {
    return `${this._asset.name} -> ${this._store.name}`;
  }
}
