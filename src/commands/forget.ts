import { withConfig, writeConfig } from "../config/persist.js";

export async function forgetCommand(args: string[]) {
  await withConfig(async (config) => {
    const path = args[0] ?? process.cwd();
    const result = config.withoutAssetOrStore(path);

    if (result.error != null) {
      console.log(`Already not tracking "${path}" as an asset or store.`);
      return;
    }

    writeConfig(result.config);
    const message = {
      asset: `Will no longer back up "${path}".`,
      store: `Will no longer back up to "${path}".`,
    }[result.type];
    console.log(message);
  });
}
