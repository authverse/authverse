import path from "path";
import fs from "fs";
import { forgetNext } from "../script/forgetNext.js";
import { forgetTanstack } from "../script/forgetTanstack.js";

export const forget = () => {
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

  if (framework === "Next js") {
    return forgetNext();
  }
  if (framework === "tanstack state") {
    return forgetTanstack();
  }
};
