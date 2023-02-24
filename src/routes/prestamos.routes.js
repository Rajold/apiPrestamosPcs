import { Router } from "express";
import { getPrestamos, getPrestamo} from "../controllers/prestamos.controllers.js";

const router= Router()

router.get ('/prestamos/', getPrestamos);
router.get ('/prestamos/', getPrestamo);


export default router