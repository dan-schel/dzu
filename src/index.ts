import { getCommand } from "./commands.js";

export async function main() {
  const args = process.argv.slice(2);
  const commandStr = args[0] ?? null;
  const command = getCommand(commandStr);
  await command(args.slice(1));
}
