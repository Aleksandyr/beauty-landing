import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Resolve `.env` next to the repo root (parent of `dist/` when running `node dist/index.js`). */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "..", ".env");

dotenv.config({ path: envPath });
