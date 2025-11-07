import inquirer from "inquirer";
import chalk from "chalk";
import { prismaRun } from "../script/prisma.js";


export const initAnswer = async () => {
  console.log(chalk.cyan("\n🚀 Welcome to Project Initializer!\n"));

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "database",
      message: "Choose your database:",
      choices: ["Prisma", "Drizzle"],
    },
    {
      type: "confirm",
      name: "authUi",
      message: "Do you want to include auth UI design?",
      default: true,
    },
  ]);

  // --- Prisma Installation ---
  if (answers.database === "Prisma") {
      prismaRun();
  }

  console.log(chalk.green("\n✅ Project setup completed successfully!\n"));
};
