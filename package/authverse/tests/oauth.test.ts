import { describe, it, expect, vi, beforeEach } from "vitest";
import { Oauth } from "../cli/oauth.js";
import { getFramework } from "../utils/framework.js";
import { googleNext } from "../oauth/googleNext.js";
import { googleTanstackStart } from "../oauth/googleTanstackStart.js";
import { AppleNext } from "../oauth/AppleNext.js";
import { AppleTanstackStart } from "../oauth/AppleTanstackStart.js";

vi.mock("../utils/framework.js");
vi.mock("../oauth/googleNext.js");
vi.mock("../oauth/githubNext.js");
vi.mock("../oauth/googleTanstackStart.js");
vi.mock("../oauth/githubTanstackStart.js");
vi.mock("../oauth/facebookNext.js");
vi.mock("../oauth/facebookTanstackStart.js");
vi.mock("../oauth/LinkedInNext.js");
vi.mock("../oauth/LinkedInTanstackStart.js");
vi.mock("../oauth/twitterNext.js");
vi.mock("../oauth/twitterTanstackStart.js");
vi.mock("../oauth/AppleNext.js");
vi.mock("../oauth/AppleTanstackStart.js");

describe("Oauth CLI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should run googleNext for Next.js with google", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "Next js", error: null });

    await Oauth({ oauth: "google" });

    expect(googleNext).toHaveBeenCalled();
  });

  it("should run googleTanstackStart for Tanstack Start with google", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "tanstack start", error: null });

    await Oauth({ oauth: "google" });

    expect(googleTanstackStart).toHaveBeenCalled();
  });

  it("should run AppleNext for Next.js with apple", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "Next js", error: null });

    await Oauth({ oauth: "apple" });

    expect(AppleNext).toHaveBeenCalled();
  });

  it("should run AppleTanstackStart for Tanstack Start with apple", async () => {
    vi.mocked(getFramework).mockResolvedValue({ framework: "tanstack start", error: null });

    await Oauth({ oauth: "apple" });

    expect(AppleTanstackStart).toHaveBeenCalled();
  });

  it("should log error for invalid provider", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    vi.mocked(getFramework).mockResolvedValue({ framework: "Next js", error: null });

    await Oauth({ oauth: "invalid" });

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid oauth provider"));
  });
});
