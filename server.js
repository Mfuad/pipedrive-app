import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middleware/errorHandler.js";
import apiClient from "./middleware/apiClient.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use("/static", express.static(path.join(__dirname, "./build/static")));

app.use(errorHandler);
app.use(apiClient);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.get("/callback", async (req, res) => {
  const authCode = req.query.code;

  try {
    const tokens = await req.apiClient.authorize(authCode);

    const companyId = tokens.access_token.split(":")[0];
    const userId = tokens.access_token.split(":")[1];

    res.json({
      ...tokens,
      userId,
      companyId,
    });
  } catch (e) {
    throw new Error(e.message);
  }
});

app.delete("/callback", async (req, res) => {
  const basicAuthHeader = Buffer.from(
    `${config.clientId}:${config.clientSecret}`
  ).toString("base64");

  if (`Basic ${basicAuthHeader}` !== req.headers.authorization) {
    res.status(401);
    return res.send("Unauthorized");
  }

  const { user_id: userId, company_id: companyId } = req.body;

  // await db.deleteInstallation(userId, companyId);

  res.send("ok");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
