import "./load-env.js";
import express from "express";
import fs from "node:fs";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { handleContactRequest } from "./contact-mail";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Bundled server lives in `dist/`; source runs from `server/`. Client build is always `dist/public`. */
function clientStaticDir(): string {
  return path.basename(__dirname) === "dist"
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");
}

function setContactCorsHeaders(res: express.Response) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(
    express.json({
      limit: "48kb",
    })
  );

  app.options("/api/contact", (_req, res) => {
    setContactCorsHeaders(res);
    res.sendStatus(204);
  });

  app.post("/api/contact", async (req, res) => {
    setContactCorsHeaders(res);
    const result = await handleContactRequest(req.body);
    if (!result.ok) {
      res.status(result.status).json({
        ok: false,
        error: result.error,
        fieldErrors: result.fieldErrors,
      });
      return;
    }
    res.status(200).json({ ok: true });
  });

  const staticPath = clientStaticDir();
  const indexPath = path.join(staticPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error(
      `[server] Missing client build at ${indexPath}. Run \`pnpm build\`, or use \`pnpm dev\` (Vite) for local development.`
    );
  }

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
