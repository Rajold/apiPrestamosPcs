import express from "express";
import equiposRoutes from './routes/equipos.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import prestamosRoutes from './routes/prestamos.routes.js'
import { login } from "./controllers/login.controllers.js";
import logIntentRoutes from "./routes/logIntent.routes.js";
import body from "body-parser";


const app = express()
app.use(body.json());
app.use(body.urlencoded({ extended: true }));

app.use(express.json())
app.use(equiposRoutes)
app.use(usuariosRoutes)
app.use(prestamosRoutes)
app.use(login)
app.use(logIntentRoutes)

app.use((req, res, next) => //en caso de solicitar una ruta que no existe
{
    res.status(404).json({
        message: 'Esta ruta no existe!'
    })
})

export default app;