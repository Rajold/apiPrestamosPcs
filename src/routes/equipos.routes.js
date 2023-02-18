import { Router } from "express";
import { 
        getEquipo, 
        getEquipos, 
        createEquipo, 
        updateEquipo, 
        deleteEquipo} 
from "../controllers/equipos.controllers.js";

const router= Router()

router.get ('/equipos', getEquipos);
router.get ('/equipos/:Pk_Serie', getEquipo);
router.post ('/equipos/agregar', createEquipo);
router.patch ('/equipos/:Pk_Serie', updateEquipo);
router.delete ('/equipos/:Pk_Serie', deleteEquipo);

export default router