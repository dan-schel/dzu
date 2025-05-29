import { helpCommand } from "./commands/help.js";
import { initCommand } from "./commands/init.js";
import { runInvalid } from "./commands/invalid.js";
import { resetCommand } from "./commands/reset.js";
import { runCommand } from "./commands/run.js";
import { versionCommand } from "./commands/version.js";

export type Command = (args: string[]) => Promise<void>;
export type CommandList = Record<string, (args: string[]) => Promise<void>>;

export const commands = {
  help: helpCommand,
  "-v": versionCommand,
  init: initCommand,
  reset: resetCommand,
  run: runCommand,
} satisfies CommandList;

export function getCommand(commandStr: string | null): Command {
  if (commandStr == null) return commands.help;

  const command = (commands as CommandList)[commandStr];
  if (command == null) return runInvalid;

  return command;
}
