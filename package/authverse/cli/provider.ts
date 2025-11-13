import chalk from "chalk";
import { googleRun } from "../script/googleRun.js";
import { githubRun } from "../script/githubRun.js";

export const providers = async ({ provider }: { provider: string }) => {
  try {
    if (provider == "google") {
      await googleRun();
    } else if (provider == "github") {
      await githubRun();
    }
  } catch (error) {
    console.log(chalk.red("Error adding provider:"), error);
  }
};
