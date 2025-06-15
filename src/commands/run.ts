import { BackupPlan } from "../backup/backup-plan.js";
import { ProgressLogger } from "../backup/progress-logger.js";
import { withConfig } from "../config/persist.js";
import { askYesNoQuestion } from "../utils/io-utils.js";

export async function runCommand() {
  await withConfig(async (config) => {
    const plan = BackupPlan.fromConfig(config);

    if (plan.getOperations().length === 0) {
      console.log("Nothing requiring backup.");
      return;
    }

    console.log("Backup plan:");
    for (const operation of plan.getOperations()) {
      console.log(`  ${operation}`);
    }

    console.log();
    const shouldRun = await askYesNoQuestion("Contine with backup?", true);

    if (shouldRun) {
      console.log();

      const logger = new ProgressLogger();
      const outcome = await plan.run(logger);
      logger.end();

      if (outcome.success === false) {
        console.log("\n🔴 Backup partially/fully failed.");
      } else {
        console.log("\n🟢 Backup complete!");
      }
    } else {
      console.log("Cancelled.");
    }
  });
}
