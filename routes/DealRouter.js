import { Router } from "express";
import { createDeal } from "../controllers/DealController.js";

export const dealRouter = Router();

dealRouter.post("/", createDeal);
