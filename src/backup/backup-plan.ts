import type { Config } from "../config/config.js";
import { CopyOperation } from "./copy-operation.js";
import { ProgressLogger } from "./progress-logger.js";
import { createIdFromPath } from "../utils/string-utils.js";

export class BackupPlan {
  constructor(
    private readonly _assetPaths: string[],
    private readonly _storePaths: string[],
  ) {}

  getOperations(): string[] {
    return this._getCopyOperations().map((o) => o.name);
  }

  async run(progress: ProgressLogger) {
    let failures = false;
    const operations = this._getCopyOperations();

    for (const operation of operations) {
      progress.report(operation.name, "pending");
    }

    for (const operation of operations) {
      progress.report(operation.name, "indeterminate");

      const outcome = await operation.do();

      if (outcome.success === true) {
        progress.report(operation.name, "done");
      } else {
        progress.report(operation.name, "failed");
        failures = true;
      }
    }

    if (failures) {
      return { success: false as const };
    } else {
      return { success: true as const };
    }
  }

  private _getCopyOperations() {
    const result: CopyOperation[] = [];

    for (const assetPath of this._assetPaths) {
      for (const storePath of this._storePaths) {
        const assetName = createIdFromPath(assetPath);
        const storeName = createIdFromPath(storePath);
        const operationName = `${assetName} -> ${storeName}`;

        result.push(new CopyOperation(operationName, assetPath, storePath));
      }
    }

    return result;
  }

  static fromConfig(config: Config) {
    return new BackupPlan(
      config.assets.map((asset) => asset.path),
      config.stores.map((store) => store.path),
    );
  }
}
