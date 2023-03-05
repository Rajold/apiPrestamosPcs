import axios from "axios";
import { pool } from "../db.js";

//controladorde acceso a url
export const logIntent= async (req, res) => {
    try {
        let {user, pass }= req.body;
        const url= 'http://10.193.129.11:3000/auth/login';

        let Pk_Identificacion_SIREP
        let Nombre_SIREP
        let Tipo_Usuario_SIREP
        let Ficha_SIREP
        let informacion = {}

        //acceder usando axios
        const response = await axios.post(url, {user: user, password: pass});

        console.log(response)

        //validar mediante Token.
        let theKey = response.data.token;
        console.log(theKey)
        if (!theKey) return res.json({ confirm: false,  message: 'Los datos ingresados no coinciden'})

        Pk_Identificacion_SIREP = response.data.user.id;
        Nombre_SIREP = response.data.user.name;
        Tipo_Usuario_SIREP = response.data.user.type;
        Ficha_SIREP = response.data.user.ficha;
        informacion = {Pk_Identificacion_SIREP, Nombre_SIREP, Tipo_Usuario_SIREP, Ficha_SIREP}
        console.log(informacion)
        
        try {
        const [sqlFind]= await pool.query(`SELECT * FROM usuarios WHERE Pk_Identificacion= ${Pk_Identificacion_SIREP} `);
        res.json(sqlFind);
        }catch (error) {
            return res.status(500).json({
                message: 'Error en la consulta'
            })
        }

        try {
        //guardar informacion en la base de datos
        const {Pk_Identificacion_SIREP, Nombre_SIREP, Tipo_Usuario_SIREP,Ficha_SIREP}= req.body
        const [sqlInsert]= await pool.query(`insert into usuarios (Pk_Identificacion, Nombre, Rol, Ficha) 
        values (?, ?, ?, ?) `);
        [Pk_Identificacion_SIREP, Nombre_SIREP, Tipo_Usuario_SIREP, Ficha_SIREP]
        res.status(201).json({Pk_Identificacion, Nombre, Rol, Id_Ficha})
        

        }catch (error) {
            return res.status(500).json({
                message: 'Error al insertar informacion'
            })
        }

        


    } catch (error) {
        
    }
}