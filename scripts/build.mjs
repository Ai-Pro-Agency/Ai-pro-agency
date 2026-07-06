import { existsSync, renameSync } from "node:fs";
import { execSync } from "node:child_process";

// output:"export" (used for the IONOS Deploy Now static package) can't
// coexist with API route handlers, which need a Node.js server. When
// STATIC_EXPORT=1, move them out of the way for the build and restore them
// afterward so the Vercel deployment (built without this flag) is unaffected.
const isStatic = process.env.STATIC_EXPORT === "1";
const apiDir = "src/app/api";
const apiBackup = "src/app/_api-disabled";

if (isStatic && existsSync(apiDir)) {
  renameSync(apiDir, apiBackup);
}

try {
  execSync("next build", { stdio: "inherit" });
} finally {
  if (isStatic && existsSync(apiBackup)) {
    renameSync(apiBackup, apiDir);
  }
}
