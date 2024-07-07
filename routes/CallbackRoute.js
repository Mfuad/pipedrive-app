import { Router } from "express";
import { deleteCallback, getCallback } from "../controllers/callbackController.js";

export const callbackRouter = Router();

callbackRouter
.get("/", getCallback)
.delete("/", deleteCallback);
