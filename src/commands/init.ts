import { Config } from "../config/config.js";

export async function initCommand() {
  await Config.init();
}
