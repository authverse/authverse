#!/usr/bin/env node
import { Command } from "commander";
import { initAnswer } from "./cli/init.js";
import { readFileSync } from "fs";
const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

const program = new Command();

program
  .name("authverse")
  .description("CLI tool for creating authverse projects")
  .version(
    packageJson.version || "1.0.0",
    "-v, --version",
    "display the version number"
  );

program
  .command("init")
  .description("Select project template and configuration")
  .action(initAnswer);

program.parse(process.argv);
