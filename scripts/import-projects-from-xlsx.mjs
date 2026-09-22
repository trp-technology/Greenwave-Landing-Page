/**
 * Import projects from "project details 2026.xlsx" into src/content/projects.ts
 *
 * Usage: node scripts/import-projects-from-xlsx.mjs
 *
 * Re-run whenever the Excel file is updated.
 */

import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scriptPath = path.join(__dirname, "import_projects.py");

execSync(`python3 "${scriptPath}"`, { stdio: "inherit" });
