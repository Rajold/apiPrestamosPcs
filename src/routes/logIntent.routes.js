import { Router } from "express";
import { logIntent } from "../controllers/logIntent.controllers.js";

const router= Router();
router.post("/logintent", logIntent);

export default router;