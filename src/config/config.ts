import { z } from "zod";
import { Asset } from "./asset.js";
import { Store } from "./store.js";
import { appCommand, appFileExtension, appName } from "../app-details.js";
import fsp from "fs/promises";
import path from "path";
import os from "os";

const configFilePath = path.join(os.homedir(), appFileExtension);

export class Config {
  static readonly default = new Config([], []);

  constructor(
    readonly assets: Asset[],
    readonly stores: Store[],
  ) {}

  static readonly json = z
    .object({
      assets: Asset.json.array(),
      stores: Store.json.array(),
    })
    .transform((x) => new Config(x.assets, x.stores));

  toJson(): z.input<typeof Config.json> {
    return {
      assets: this.assets.map((x) => x.toJson()),
      stores: this.stores.map((x) => x.toJson()),
    };
  }

  async write() {
    await fsp.writeFile(configFilePath, JSON.stringify(this.toJson(), null, 2));
  }

  static async read() {
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

  static async init() {
    // TODO: Block if the user already has a config. They should use reset instead.
    await Config.default.write();
  }

  static async reset() {
    await Config.default.write();
  }
}

export async function withConfig(callback: (config: Config) => Promise<void>) {
  const result = await Config.read();
  if (result.error === "no-config") {
    console.log(
      `No config found. If it's your first time running ${appName}, run "${appCommand} init".`,
    );
  } else if (result.error === "corrupt-config") {
    console.log(`Config is corrupted. Run "${appCommand} reset" to reset it.`);
  } else {
    await callback(result.config);
  }
}
