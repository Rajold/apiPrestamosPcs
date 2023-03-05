import { Router } from "express";
import { logIntent } from "../controllers/login2.controllers.js";

const router= Router();
router.post("/login", logIntent);

export default router;