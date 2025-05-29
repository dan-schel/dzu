import { configFilePathDisplayString, resetConfig } from "../config/persist.js";

export async function resetCommand() {
  await resetConfig();
  console.log(`Reset "${configFilePathDisplayString}".`);
}
