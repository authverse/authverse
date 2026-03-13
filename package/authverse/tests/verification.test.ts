import { describe, it, expect, vi, beforeEach } from "vitest";
import { verification } from "../cli/verification.js";
import { getFramework } from "../utils/framework.js";
import { verifyNext } from "../script/verifyNext.js";
import { verifyTanstack } from "../script/verifyTanstack.js";

vi.mock("../utils/framework.js");
vi.mock("../script/verifyNext.js");
vi.mock("../script/verifyTanstack.js");

describe("verification CLI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should run verifyNext for Next.js", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "Next js", error: null });

    await verification();

    expect(verifyNext).toHaveBeenCalled();
  });

  it("should run verifyTanstack for Tanstack Start", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "tanstack start", error: null });

    await verification();

    expect(verifyTanstack).toHaveBeenCalled();
  });
});
