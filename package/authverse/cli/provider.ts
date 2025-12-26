import chalk from "chalk";
import { googleRun } from "../script/googleRun.js";
import { githubRun } from "../script/githubRun.js";
import path from "path";
import fs from "fs";
import { googleRunTanstackState } from "../script/googleRunTanstackState.js";
import { githubRunTanstackState } from "../script/githubRunTanstackState.js";

export const providers = async ({ provider }: { provider: string }) => {
  try {
    const projectDir = process.cwd();
    const packageJsonPath = path.join(projectDir, "package.json");

    // Auto detect framework
    let framework: "Next js" | "tanstack state" = "tanstack state";

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

      const hasNext =
        packageJson?.dependencies?.["next"] ||
        packageJson?.devDependencies?.["next"];

      framework = hasNext ? "Next js" : "tanstack state";
    }

    if (framework === "Next js" && provider == "google") {
      await googleRun();
    } else if (framework === "Next js" && provider == "github") {
      await githubRun();
    }

    if (framework === "tanstack state" && provider == "google") {
      await googleRunTanstackState();
    } else if (framework === "tanstack state" && provider == "github") {
      await githubRunTanstackState();
    }
  } catch (error) {
    console.log(chalk.red("Error adding provider:"), error);
  }
};
