import { withConfig } from "../config/persist.js";

export async function listCommand() {
  await withConfig(async (config) => {
    console.log(config);
  });
}
