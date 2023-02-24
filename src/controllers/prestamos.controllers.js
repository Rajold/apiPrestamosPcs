import {pool} from '../db.js';

//Consultar
export const getPrestamos= async (req, res) => {
    try{
 const [rows]= await pool.query('select * from prestamos ');
 res.json(rows);
} catch (error) {
    return res.status(500).json({
        message: 'Huy, algo no está funcionando'
    })
}
}

//Consultar por Identificación
export const getPrestamo= async (req, res) => {
    try{
 const [rows]= await pool.query('select * from prestamos where Pk_Prestamo = $1', [req.params.Pk_Prestamo]);
 res.json(rows);
} catch (error) {
    return res.status(500).json({
        message: 'Huy, algo no está funcionando'
    })
}
}