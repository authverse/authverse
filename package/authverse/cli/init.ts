import inquirer from "inquirer";
import { prismaRun } from "../script/prisma.js";
import { drizzleRun } from "../script/drizzleRun.js";

export const initAnswer = async () => {
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
    await prismaRun(answers.authUi);
  }

  // --- Drizzle Installation ---
  if (answers.database === "Drizzle") {
    await drizzleRun(answers.authUi);
  }
};
