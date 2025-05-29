import { forgetCommand } from "./commands/forget.js";
import { helpCommand } from "./commands/help.js";
import { initCommand } from "./commands/init.js";
import { runInvalid } from "./commands/invalid.js";
import { listCommand } from "./commands/list.js";
import { protectCommand } from "./commands/protect.js";
import { resetCommand } from "./commands/reset.js";
import { runCommand } from "./commands/run.js";
import { useCommand } from "./commands/use.js";
import { versionCommand } from "./commands/version.js";

export type Command = (args: string[]) => Promise<void>;
export type CommandList = Record<string, (args: string[]) => Promise<void>>;

// TODO: "audit" command to display which assets are due for backup.
// TODO: "clean" command to delete everything from a store.

export const commands = {
  help: helpCommand,
  "-v": versionCommand,
  init: initCommand,
  reset: resetCommand,
  list: listCommand,
  run: runCommand,
  protect: protectCommand,
  use: useCommand,
  forget: forgetCommand,
} satisfies CommandList;

export function getCommand(commandStr: string | null): Command {
  if (commandStr == null) return commands.help;

  const command = (commands as CommandList)[commandStr];
  if (command == null) return runInvalid;

  return command;
}
