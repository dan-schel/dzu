import { withConfig } from "../config/config.js";

export async function runCommand() {
  await withConfig(async (config) => {
    console.log(config);
  });
}
