import { Asset } from "../config/asset.js";
import { withConfig, writeConfig } from "../config/persist.js";

export async function protectCommand(args: string[]) {
  await withConfig(async (config) => {
    const path = args[0] ?? process.cwd();
    writeConfig(config.withAsset(new Asset(path)));
    console.log(`Will backup "${path}".`);
  });
}
