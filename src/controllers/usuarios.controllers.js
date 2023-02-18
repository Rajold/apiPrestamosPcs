import {pool} from '../db.js';

//Consultar
export const getUsuarios= async (req, res) => {
    try{
 const [rows]= await pool.query('select *from usuarios');
 res.json(rows);
} catch (error) {
    return res.status(500).json({
        message: 'Huy, algo no está funcionando'
    })
}
}

//Consultar por Identificación
export const getUsuario= async(req, res) => {
   try { 
    const {Pk_Serie}= req.params;
    const [rows]= await pool.query("select *from usuarios where Pk_Identificacion= ?", [
        Pk_Identificacion,
    ]);

    if (rows.length <=0 )return res.status(404).json({
        message: 'Usuario no encontrado'
    });

    res.json(rows[0])
   } catch (error) {
    return res.status(500).json({
        message: "Huy, algo no está funcionando"
   })
}
};

//Crear
export const createUsuario= async (req, res) => {
    try {
    const {Pk_Identificacion, Nombre, Rol, Telefono}= req.body
    const [rows]= await pool.query(
        "insert into usuarios(Pk_Identificacion, Nombre, Rol, Telefono) values (?, ?, ?, ?)",
         [ Pk_Identificacion, Nombre, Rol, Telefono] );
         res.status(201).json({ Pk_Identificacion, Nombre, Rol, Telefono });
    } catch (error) {
        return res.status(500).json({
            message: 'Huy, algo no está funcionando'
       }) 
    }
};

//Actualizar
export const updateUsuario= async(req, res) => {
    try {
    const {Pk_Identificacion}= req.params // equivalente a: const Pk_Identificacion= req.params.Pk_Serie
    const {Nombre, Rol, Telefono}= req.body

    const [result]= await pool.query(
        "update usuarios set Nombre= ifnull(?, Nombre), Rol= ifnull(?, Rol), Telefono= ifnull(?, Telefono) where Pk_Identificacion= ?",
         [Nombre, Rol, Telefono, Pk_Identificacion]);

    if (result.affectedRows=== 0) 
    return res.status(404).json({message: 'Usuario no encontrado'});

    const [rows]= await pool.query('select *from usuarios where Pk_Identificacion= ?', [Pk_Identificacion]);

    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Huy, algo no está funcionando'});
    }
};

//Eliminar
export const deleteUsuario= async(req, res) => {
    try {
        const {Pk_Identificacion}= req.params;
        const [rows]= await pool.query('delete from usuarios where Pk_Identificacion= ?', [Pk_Identificacion] );

        if (rows.affectedRows <=0 ) {
            return res.status(204).json({message: 'Usuario eliminado'});
    }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: 'Huy, algo no está funcionando'});
    }
};