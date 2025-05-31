import { appCommand, appFileExtension, appNameShort } from "../app-details.js";
import fsp from "fs/promises";
import path from "path";
import os from "os";
import { Config } from "./config.js";

const configFilePath = path.join(os.homedir(), appFileExtension);
export const configFilePathDisplayString = `~/${appFileExtension}`;

export async function readConfig() {
  let jsonStr: string | null = null;

  try {
    jsonStr = await fsp.readFile(configFilePath, "utf-8");
  } catch {
    return { error: "no-config" as const };
  }

  try {
    return { config: Config.json.parse(JSON.parse(jsonStr)) };
  } catch {
    return { error: "corrupt-config" as const };
  }
}

export async function writeConfig(config: Config) {
  await fsp.writeFile(configFilePath, JSON.stringify(config.toJson(), null, 2));
}

export async function initConfig() {
  // TODO: Block if the user already has a config. They should use reset instead.
  await writeConfig(Config.default);
}

export async function resetConfig() {
  await writeConfig(Config.default);
}

export async function withConfig(callback: (config: Config) => Promise<void>) {
  const result = await readConfig();
  if (result.error === "no-config") {
    console.log(
      `No ${configFilePathDisplayString} found. If it's your first time running ${appNameShort}, run "${appCommand} init".`,
    );
  } else if (result.error === "corrupt-config") {
    console.log(
      `Your ${configFilePathDisplayString} is corrupt. Run "${appCommand} reset" to reset it.`,
    );
  } else {
    await callback(result.config);
  }
}
