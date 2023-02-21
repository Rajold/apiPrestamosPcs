import { Router } from "express";
import { 
        getUsuarios, 
        getUsuario, 
        createUsuario, 
        updateUsuario, 
        deleteUsuario,
        } 
from "../controllers/usuarios.controllers.js";

const router= Router()

router.get ('/usuarios', getUsuarios);
router.get ('/usuarios/:Pk_Identificacion', getUsuario);
router.post ('/usuarios', createUsuario);
router.patch ('/usuarios/:Pk_Identificacion', updateUsuario);
router.delete ('/usuarios/:Pk_Identificacion', deleteUsuario);

export default router