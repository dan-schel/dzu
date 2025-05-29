import { withConfig, writeConfig } from "../config/persist.js";
import { Store } from "../config/store.js";

export async function useCommand(args: string[]) {
  await withConfig(async (config) => {
    // TODO: Display a `npm init` style wizard that allows the user to choose
    // which directory (enter for pwd).

    const path = args[0] ?? process.cwd();
    writeConfig(config.withStore(new Store(path)));
    console.log(`Will backup to "${path}".`);
  });
}
