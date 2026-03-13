import { describe, it, expect, vi, beforeEach } from "vitest";
import { forget } from "../cli/forget.js";
import { getFramework } from "../utils/framework.js";
import { forgetNext } from "../script/forgetNext.js";
import { forgetTanstack } from "../script/forgetTanstack.js";

vi.mock("../utils/framework.js");
vi.mock("../script/forgetNext.js");
vi.mock("../script/forgetTanstack.js");

describe("forget CLI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should run forgetNext for Next.js", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "Next js", error: null });
    
    await forget();

    expect(forgetNext).toHaveBeenCalled();
  });

  it("should run forgetTanstack for Tanstack Start", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "tanstack start", error: null });

    await forget();

    expect(forgetTanstack).toHaveBeenCalled();
  });
});
