import { describe, it, expect, vi, beforeEach } from "vitest";
import inquirer from "inquirer";
import fs from "fs";
import { email } from "../cli/email.js";
import { getFramework } from "../utils/framework.js";
import { gmailRun } from "../email/gmailRun.js";
import { gmailRunTanstackStart } from "../email/gmailRunTanstackStart.js";
import { awsSesRun } from "../email/awsSesRun.js";
import { awsSesRunTanstackStart } from "../email/awsSesRunTanstackStart.js";
import { resendRun } from "../email/resendRun.js";
import { resendRunTanstackStart } from "../email/resendRunTanstackStart.js";

vi.mock("inquirer");
vi.mock("fs");
vi.mock("../utils/framework.js");
vi.mock("../email/gmailRun.js");
vi.mock("../email/gmailRunTanstackStart.js");
vi.mock("../email/awsSesRun.js");
vi.mock("../email/awsSesRunTanstackStart.js");
vi.mock("../email/resendRun.js");
vi.mock("../email/resendRunTanstackStart.js");

describe("email CLI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(process, "cwd").mockReturnValue("/mock/project");
  });

  it("should run gmailRun for Next.js when Gmail is selected", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "Next js", error: null });
    vi.mocked(fs.existsSync).mockReturnValue(false); // No existing email file
    vi.mocked(inquirer.prompt).mockResolvedValue({ emailProvider: "Gmail" });

    await email();

    expect(gmailRun).toHaveBeenCalled();
  });

  it("should run gmailRunTanstackStart for Tanstack Start when Gmail is selected", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "tanstack start", error: null });
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(inquirer.prompt).mockResolvedValue({ emailProvider: "Gmail" });

    await email();

    expect(gmailRunTanstackStart).toHaveBeenCalled();
  });

  it("should prompt for overwrite if email file exists in Next.js", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "Next js", error: null });
    vi.mocked(fs.existsSync).mockReturnValue(true); // File exists
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ overwrite: true }) // First prompt: overwrite
      .mockResolvedValueOnce({ emailProvider: "Resend" }); // Second prompt: provider

    await email();

    expect(inquirer.prompt).toHaveBeenCalledTimes(2);
    expect(resendRun).toHaveBeenCalled();
  });

  it("should abort if overwrite is declined in Next.js", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "Next js", error: null });
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(inquirer.prompt).mockResolvedValue({ overwrite: false });

    await email();

    expect(resendRun).not.toHaveBeenCalled();
    expect(inquirer.prompt).toHaveBeenCalledTimes(1);
  });
});
