import { Router } from "express";

import { login } from "../controllers/login.controllers.js";

const router= Router()

router.post('/login', login)

export default router

 // Aqui añadi la ruta que tiene, lo puede importar desde su rutero principal y borra este

 // No olvide agregar el ".js" a los modulos propios que importe en su Modulo principal