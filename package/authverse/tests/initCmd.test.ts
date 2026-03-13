import { describe, it, expect, vi, beforeEach } from "vitest";
import { initCmd, cmdType } from "../cli/initCmd.js";
import { getFramework } from "../utils/framework.js";
import { prismaRun } from "../script/prisma.js";
import { drizzleRun } from "../script/drizzleRun.js";
import { prismaRunTanstackStart } from "../script/prismaRunTanstackStart.js";
import { drizzleRunTanstackStart } from "../script/drizzleRunTanstackStart.js";

vi.mock("../utils/framework.js");
vi.mock("../script/prisma.js");
vi.mock("../script/drizzleRun.js");
vi.mock("../script/prismaRunTanstackStart.js");
vi.mock("../script/drizzleRunTanstackStart.js");

describe("initCmd CLI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should run prismaRun for Next.js with prisma", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "Next js", error: null });
    const cmd: cmdType = { orm: "prisma", db: "Postgresql", authUi: "yes" };

    await initCmd(cmd);

    expect(prismaRun).toHaveBeenCalledWith({
      database: "Postgresql",
      authUi: true,
      cmd: true,
    });
  });

  it("should run drizzleRun for Next.js with drizzle", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "Next js", error: null });
    const cmd: cmdType = { orm: "drizzle", db: "Postgresql", authUi: "no" };

    await initCmd(cmd);

    expect(drizzleRun).toHaveBeenCalledWith({
      authUi: false,
      cmd: true,
    });
  });

  it("should run prismaRunTanstackStart for Tanstack Start with prisma", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "tanstack start", error: null });
    const cmd: cmdType = { orm: "prisma", db: "Mongodb", authUi: "yes" };

    await initCmd(cmd);

    expect(prismaRunTanstackStart).toHaveBeenCalledWith({
      authUi: true,
      database: "Mongodb",
      cmd: true,
    });
  });

  it("should run drizzleRunTanstackStart for Tanstack Start with drizzle", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "tanstack start", error: null });
    const cmd: cmdType = { orm: "drizzle", db: "Mysql", authUi: "yes" };

    await initCmd(cmd);

    expect(drizzleRunTanstackStart).toHaveBeenCalledWith({
      authUi: true,
      cmd: true,
    });
  });
});
