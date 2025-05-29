import { configFilePathDisplayString, initConfig } from "../config/persist.js";

export async function initCommand() {
  await initConfig();
  console.log(`Created "${configFilePathDisplayString}".`);
}
