import { withConfig, writeConfig } from "../config/persist.js";
import path from "path";

export async function forgetCommand(args: string[]) {
  await withConfig(async (config) => {
    const pathStr = path.resolve(args[0] ?? process.cwd());
    const result = config.withoutAssetOrStore(pathStr);

    if (result.error != null) {
      console.log(`Already not tracking "${pathStr}" as an asset or store.`);
      return;
    }

    writeConfig(result.config);

    const message = {
      asset: `Will no longer back up "${pathStr}".`,
      store: `Will no longer back up to "${pathStr}".`,
    }[result.type];
    console.log(message);
  });
}
