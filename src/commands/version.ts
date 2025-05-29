import { appName, appVersion } from "../app-details.js";

export async function versionCommand() {
  console.log(`${appName} v${appVersion}`);
}
