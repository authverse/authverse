import chalk from "chalk";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { packageManager, runCommand } from "../utils/packageManager.js";

const shadcnComponents = [
  "button.tsx",
  "card.tsx",
  "field.tsx",
  "input.tsx",
  "label.tsx",
  "separator.tsx",
  "sonner.tsx",
];

export const authUiRun = async ({
  folder,
  packageJson,
}: {
  folder: string;
  packageJson: any;
}) => {
  try {
    const projectDir = process.cwd();
    // install shadcn ui
    console.log(chalk.yellow("\n Installing shadcn ui Components\n"));

    // check if shadcn ui is already installed
    const shadcnPath = path.join(projectDir, folder, "components", "ui");

    if (!fs.existsSync(shadcnPath)) {
      runCommand("shadcn@latest add button sonner card field input");
    }
    // list all files in shadcnPath
    const shadcnFiles = fs.readdirSync(shadcnPath);

    // Find missing components
    const missingComponents = shadcnComponents.filter(
      (component) => !shadcnFiles.includes(component),
    );

    if (missingComponents.length > 0) {
      const install = missingComponents
        .map((components) => components.split(".")[0])
        .join(" ");
      runCommand(`shadcn@latest add ${install}`);
    }

    if (
      !packageJson.dependencies?.["react-hook-form"] &&
      !packageJson.dependencies?.["@hookform/resolvers"]
    ) {
      packageManager("react-hook-form @hookform/resolvers");
    }

    //  Fix for __dirname in ES module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Copy Auth UI files components

    const componentPath = path.resolve(__dirname, "./template/components");

    // Create authverse
    const destinationPath = path.join(
      projectDir,
      folder,
      "components",
      "authverse",
    );

    // Ensure the directory exists before copying the file
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    // Copy component files = LoginComponent.tsx SingUpComponent.tsx and Logout.tsx
    const LoginDestinationPath = path.join(
      destinationPath,
      "LoginComponent.tsx",
    );
    fs.copyFileSync(
      `${componentPath}/LoginComponent.tsx`,
      LoginDestinationPath,
    );

    const SignUpDestinationPath = path.join(
      destinationPath,
      "SingUpComponent.tsx",
    );
    fs.copyFileSync(
      `${componentPath}/SingUpComponent.tsx`,
      SignUpDestinationPath,
    );

    // app add auth logic route
    const authTemplatePath = path.resolve(
      __dirname,
      "./template/app-auth-uiDesign",
    );

    // Create app directory
    const appDestinationPath = path.join(projectDir, folder, "app", "auth");

    // Ensure the directory exists before copying the file
    if (!fs.existsSync(appDestinationPath)) {
      fs.mkdirSync(appDestinationPath, { recursive: true });
    }

    // Copy layout.tsx
    const layoutDestinationPath = path.join(appDestinationPath, "layout.tsx");
    fs.copyFileSync(`${authTemplatePath}/layout.tsx`, layoutDestinationPath);

    // Create login directory
    const loginDestinationDir = path.join(appDestinationPath, "login");

    if (!fs.existsSync(loginDestinationDir)) {
      fs.mkdirSync(loginDestinationDir, { recursive: true });
    }

    // Copy page.tsx to login directory
    const loginPageDestinationPath = path.join(loginDestinationDir, "page.tsx");
    fs.copyFileSync(
      `${authTemplatePath}/login/page.tsx`,
      loginPageDestinationPath,
    );

    // Create signup directory
    const signUpDestinationDir = path.join(appDestinationPath, "signup");

    if (!fs.existsSync(signUpDestinationDir)) {
      fs.mkdirSync(signUpDestinationDir, { recursive: true });
    }

    // Copy page.tsx to signup directory
    const signUpPageDestinationPath = path.join(
      signUpDestinationDir,
      "page.tsx",
    );

    fs.copyFileSync(
      `${authTemplatePath}/signup/page.tsx`,
      signUpPageDestinationPath,
    );

    // Add layout root layout.tsx
    const layoutPath = path.join(projectDir, folder, "app", "layout.tsx");
    if (fs.existsSync(layoutPath)) {
      let layoutContent = fs.readFileSync(layoutPath, "utf-8");

      if (!layoutContent.includes("Toaster")) {
        layoutContent = `import { Toaster } from "@/components/ui/sonner";\n${layoutContent}`;
      }

      if (!layoutContent.includes("<Toaster")) {
        layoutContent = layoutContent.replace(
          /<\/body>/,
          "    <Toaster />\n  </body>",
        );
      }

      fs.writeFileSync(layoutPath, layoutContent, "utf-8");
    }

    console.log(chalk.green("\nSetup completed!\n"));
  } catch (error) {
    console.log(chalk.red("\nauthUi setup failed:"), error);
  }
};
