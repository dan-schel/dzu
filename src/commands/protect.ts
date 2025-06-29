import { uuid } from "@dan-schel/js-utils";
import { Asset } from "../config/asset.js";
import { withConfig, writeConfig } from "../config/persist.js";
import path from "path";

export async function protectCommand(args: string[]) {
  await withConfig(async (config) => {
    // TODO: Display a `npm init` style wizard that allows the user to choose
    // which directory (enter for pwd), which frequency of backup, and how many
    // backups to keep in each store.

    const pathStr = path.resolve(args[0] ?? process.cwd());
    writeConfig(config.withAsset(new Asset(uuid(), pathStr)));
    console.log(`Will backup "${pathStr}".`);
  });
}
