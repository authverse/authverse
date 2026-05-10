import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  platform: "node",
  tsconfig: "tsconfig.build.json",
});
