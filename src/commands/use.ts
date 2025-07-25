import { uuid } from "@dan-schel/js-utils";
import { withConfig, writeConfig } from "../config/persist.js";
import { Store } from "../config/store.js";
import path from "path";

export async function useCommand(args: string[]) {
  await withConfig(async (config) => {
    // TODO: Display a `npm init` style wizard that allows the user to choose
    // which directory (enter for pwd).

    const pathStr = path.resolve(args[0] ?? process.cwd());
    writeConfig(config.withStore(new Store(uuid(), pathStr)));
    console.log(`Will backup to "${pathStr}".`);
  });
}
