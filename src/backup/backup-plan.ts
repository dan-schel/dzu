import type { Config } from "../config/config.js";
import { CopyOperation } from "./copy-operation.js";
import { ProgressLogger } from "./progress-logger.js";
import type { Asset } from "../config/asset.js";
import type { Store } from "../config/store.js";
import type { JustDate } from "../utils/just-date.js";
import { CompletedBackup } from "../config/completed-backup.js";

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
    // TODO: To enable retry, we need to record which operations fail so we have
    // some method of retrying. Maybe both these variables can be rolled into
    // one `operationsResults` array or something (see comment below).
    let failures = false;
    const completedBackups: CompletedBackup[] = [];

    const operations = this._getCopyOperations();

    for (const operation of operations) {
      progress.report(operation.name, "pending");
    }

    for (const operation of operations) {
      progress.report(operation.name, "indeterminate");

      const outcome = await operation.do();

      if (outcome.success === true) {
        progress.report(operation.name, "done");

        // TODO: Maybe the result operations return should include the completed
        // backups to add to the array, or the operations to retry in the case
        // of failures?
        if (operation instanceof CopyOperation) {
          completedBackups.push(operation.asCompletedBackup());
        }
      } else {
        progress.report(operation.name, "failed");
        failures = true;
      }
    }

    if (failures) {
      return { success: false as const };
    } else {
      return { success: true as const, completedBackups };
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
