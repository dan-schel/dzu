import { appCommand } from "../app-details.js";

export async function runInvalid() {
  console.log(
    `Invalid command. Run "${appCommand} help" to view available commands.`,
  );
}
