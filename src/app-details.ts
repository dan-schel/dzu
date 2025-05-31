import fs from "fs";
import { z } from "zod";
import path from "path";
import url from "url";

export const installPath = path.join(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "../",
);

const packageJsonFile = path.join(installPath, "package.json");

const packageJsonSchema = z.object({
  name: z.string(),
  version: z.string(),
});

const packageJson = packageJsonSchema.parse(
  JSON.parse(fs.readFileSync(packageJsonFile, "utf-8")),
);

export const appName = "Dan's Zip Util";
export const appNameShort = "DZU";
export const appVersion = packageJson.version;
export const appCommand = path.basename(process.argv[1] ?? packageJson.name);
export const appFileExtension = `.${appCommand}`;
