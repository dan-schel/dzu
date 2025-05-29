import { Config } from "../config/config.js";

export async function resetCommand() {
  await Config.reset();
}
