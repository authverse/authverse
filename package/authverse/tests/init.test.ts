import { describe, it, expect, vi, beforeEach } from "vitest";
import inquirer from "inquirer";
import { initAnswer } from "../cli/init.js";
import { getFramework } from "../utils/framework.js";
import { prismaRun } from "../script/prisma.js";
import { drizzleRun } from "../script/drizzleRun.js";
import { prismaRunTanstackStart } from "../script/prismaRunTanstackStart.js";
import { drizzleRunTanstackStart } from "../script/drizzleRunTanstackStart.js";

// Mock dependencies
vi.mock("inquirer");
vi.mock("../utils/framework.js");
vi.mock("../script/prisma.js");
vi.mock("../script/drizzleRun.js");
vi.mock("../script/prismaRunTanstackStart.js");
vi.mock("../script/drizzleRunTanstackStart.js");

describe("initAnswer E2E", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should run prismaRun for Next.js with Prisma", async () => {
    vi.mocked(getFramework).mockResolvedValue({
      framework: "Next js",
      error: null,
    });
    vi.mocked(inquirer.prompt).mockResolvedValue({
      orm: "Prisma",
      database: "Postgresql",
      authUi: true,
    });

    await initAnswer();

    expect(prismaRun).toHaveBeenCalledWith({
      authUi: true,
      database: "Postgresql",
      cmd: false,
    });
  });

  it("should run drizzleRun for Next.js with Drizzle", async () => {
    vi.mocked(getFramework).mockResolvedValue({
      framework: "Next js",
      error: null,
    });
    vi.mocked(inquirer.prompt).mockResolvedValue({
      orm: "Drizzle",
      authUi: false,
    });

    await initAnswer();

    expect(drizzleRun).toHaveBeenCalledWith({
      authUi: false,
      cmd: false,
    });
  });

  it("should run prismaRunTanstackStart for Tanstack Start with Prisma", async () => {
    vi.mocked(getFramework).mockResolvedValue({
      framework: "tanstack start",
      error: null,
    });
    vi.mocked(inquirer.prompt).mockResolvedValue({
      orm: "Prisma",
      database: "Mongodb",
      authUi: true,
    });

    await initAnswer();

    expect(prismaRunTanstackStart).toHaveBeenCalledWith({
      authUi: true,
      database: "Mongodb",
      cmd: false,
    });
  });

  it("should run drizzleRunTanstackStart for Tanstack Start with Drizzle", async () => {
    vi.mocked(getFramework).mockResolvedValue({
      framework: "tanstack start",
      error: null,
    });
    vi.mocked(inquirer.prompt).mockResolvedValue({
      orm: "Drizzle",
      authUi: true,
    });

    await initAnswer();

    expect(drizzleRunTanstackStart).toHaveBeenCalledWith({
      authUi: true,
      cmd: false,
    });
  });

  it("should log error if framework detection fails", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    vi.mocked(getFramework).mockResolvedValue({
      framework: null,
      error: "No framework detected",
    });

    await initAnswer();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("No framework detected"),
    );
    expect(inquirer.prompt).not.toHaveBeenCalled();
  });
});
