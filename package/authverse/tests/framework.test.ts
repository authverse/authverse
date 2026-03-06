import { describe, it, expect, vi, beforeEach } from "vitest";
import { getFramework } from "../utils/framework.js";
import fs from "fs";
import path from "path";

vi.mock("fs");

describe("getFramework", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(process, "cwd").mockReturnValue("/mock/project");
  });

  it("should detect Next.js project", async () => {
    const packageJson = {
      dependencies: {
        next: "14.0.0",
      },
    };

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = await getFramework();

    expect(result.framework).toBe("Next js");
    expect(result.error).toBeNull();
  });

  it("should detect Tanstack Start project", async () => {
    const packageJson = {
      devDependencies: {
        "@tanstack/react-start": "0.0.1",
      },
    };

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = await getFramework();

    expect(result.framework).toBe("tanstack start");
    expect(result.error).toBeNull();
  });

  it("should return error if package.json is missing", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = await getFramework();

    expect(result.framework).toBeNull();
    expect(result.error).toBe("No framework detected");
  });

  it("should return error if no supported framework is found", async () => {
    const packageJson = {
      dependencies: {
        express: "4.18.0",
      },
    };

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = await getFramework();

    expect(result.framework).toBeNull();
    expect(result.error).toBe("No framework supported authverse");
  });
});
