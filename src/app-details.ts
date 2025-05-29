import fs from "fs";
import { z } from "zod";

const packageJsonFile = "./package.json";

const packageJsonSchema = z.object({
  name: z.string(),
  version: z.string(),
});

const packageJson = packageJsonSchema.parse(
  JSON.parse(fs.readFileSync(packageJsonFile, "utf-8")),
);

export const appName = packageJson.name;
export const appCommand = appName;
export const appFileExtension = `.${appCommand}`;
export const appVersion = packageJson.version;
