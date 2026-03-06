import { describe, it, expectTypeOf } from "vitest";
import { initAnswer } from "../cli/init.js";

describe("initAnswer types", () => {
  it("should be a function", () => {
    expectTypeOf(initAnswer).toMatchTypeOf<Function>();
  });

  it("should return a promise", () => {
    expectTypeOf(initAnswer()).toMatchTypeOf<Promise<void>>();
  });

  it("should return void when awaited", () => {
    expectTypeOf(initAnswer()).resolves.toBeVoid();
  });
});
