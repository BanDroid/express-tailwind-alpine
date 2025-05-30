import { config, DotenvParseOutput } from "dotenv";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const envPath = existsSync(join(cwd(), "..", ".env"))
  ? join(cwd(), "..", ".env")
  : join(cwd(), ".env");

const env:
  | DotenvParseOutput
  | {
      [key: string]: string | undefined;
    } =
  config({
    path: envPath,
  }).parsed || {};

for (const [key, value] of Object.entries(process.env)) {
  if (value) env[key] = value;
}

export default env;
