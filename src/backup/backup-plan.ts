import type { Config } from "../config/config.js";
import { CopyOperation } from "./copy-operation.js";
import { ProgressLogger } from "./progress-logger.js";
import type { Asset } from "../config/asset.js";
import type { Store } from "../config/store.js";
import type { JustDate } from "../utils/just-date.js";

export class BackupPlan {
  constructor(
    private readonly _date: JustDate,
    private readonly _assets: Asset[],
    private readonly _stores: Store[],
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

    for (const asset of this._assets) {
      for (const store of this._stores) {
        result.push(new CopyOperation(this._date, asset, store));
      }
    }

    return result;
  }

  static fromConfig(config: Config, date: JustDate) {
    return new BackupPlan(date, config.assets, config.stores);
  }
}
