import { appName, appNameShort } from "../app-details.js";
import { commands } from "../commands.js";
import { configFilePathDisplayString } from "../config/persist.js";

const allDescriptions: Record<keyof typeof commands, string | null> = {
  help: null,
  "-v": null,
  init: `Initialize ${appNameShort} for first use.`,
  reset: `Reset ${configFilePathDisplayString} to default settings.`,
  list: "Output the list of assets and stores currently in the configuration.",
  run: "Clone all assets which are due for backup to each available store.",

  // TODO: "Register" could be a better word here.
  protect: "Mark the current directory as an asset which requires backup.",
  use: "Mark the currect directory as a store which backups should be made to.",

  forget: "Removes the current directory from the list of assets or stores.",
};

export async function helpCommand() {
  console.log(`${appName}\nA rudimentary CLI-based backup tool.\n\nCommands:`);

  const descriptions = Object.entries(allDescriptions)
    .sort(([a], [b]) => a.localeCompare(b))
    .filter((x): x is [string, string] => x[1] != null);

  for (const [key, value] of descriptions) {
    console.log(`  ${key}: ${value}`);
  }
}
