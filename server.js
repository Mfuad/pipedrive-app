import express from "express";
import path from "path";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import errorHandler from "./middlewares/errorHandler.js";
import apiClient from "./middlewares/apiClient.js";
import logger from "./middlewares/logger.js";
import { callbackRouter } from "./routes/callbackRoute.js";
import { dealRouter } from "./routes/dealRouter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(errorHandler);
app.use(apiClient);
app.use(logger);

app.use("/static", express.static(path.join(__dirname, "./public/static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.use("/callback", callbackRouter);
app.use("/deals", dealRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
