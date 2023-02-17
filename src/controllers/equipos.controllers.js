import {pool} from '../db.js';

//Consultar
export const getEquipos= async (req, res) => {
    try{
 const [rows]= await pool.query('select *from equipos');
 res.json(rows);
} catch (error) {
    return res.status(500).json({
        message: 'Huy, algo no está funcionando'
    })
}
}

//Consultar por Serie
export const getEquipo= async(req, res) => {
   try { 
    const {Pk_Serie}= req.params;
    const [rows]= await pool.query("select *from equipos where Pk_Serie= ?", [
        Pk_Serie,
    ]);

    if (rows.length <=0 )return res.status(404).json({
        message: 'Elemento no encontrado'
    });

    res.json(rows[0])
   } catch (error) {
    return res.status(500).json({
        message: "Huy, algo no está funcionando"
   })
}
};

//Crear
export const createEquipo= async (req, res) => {
    try {
    const {Pk_Serie, Marca, Modelo, Nota}= req.body
    const [rows]= await pool.query(
        "insert into equipos(Pk_Serie, Marca, Modelo, Nota) values (?, ?, ?, ?)",
         [ Pk_Serie, Marca, Modelo, Nota] );
         res.status(201).json({ Pk_Serie, Marca, Modelo, Nota });
    } catch (error) {
        return res.status(500).json({
            message: 'Huy, algo no está funcionando'
       }) 
    }
};

//Actualizar
export const updateEquipo= async(req, res) => {
    try {
    const {Pk_Serie}= req.params // equivalente a: const id= req.params.Pk_Serie
    const {Marca, Modelo, Nota}= req.body

    const [result]= await pool.query(
        "update equipos set Marca= ifnull(?, Marca), Modelo= ifnull(?, Modelo), Nota= ifnull(?, Nota) where Pk_Serie= ?",
         [Marca, Modelo, Nota, Pk_Serie]);

    if (result.affectedRows=== 0) 
    return res.status(404).json({message: 'Elemento no encontrado'});

    const [rows]= await pool.query('select *from equipos where Pk_Serie= ?', [Pk_Serie]);

    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Huy, algo no está funcionando'});
    }
};

//Eliminar
export const deleteEquipo= async(req, res) => {
    try {
        const {Pk_Serie}= req.params;
        const [rows]= await pool.query('delete from equipos where Pk_Serie= ?', [Pk_Serie] );

        if (rows.affectedRows <=0 ) {
            return res.status(204).json({message: 'Elemento eliminado'});
    }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: 'Huy, algo no está funcionando'});
    }
};