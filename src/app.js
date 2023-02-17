import express from "express";
import equiposRoutes from './routes/equipos.routes.js'

const app = express()

app.use(express.json())
app.use(equiposRoutes)

app.use((req, res, next) => //en caso de solicitar una ruta que no existe
{
    res.status(404).json({
        message: 'Esta ruta no existe!, busque otra '
    })
})

export default app;