
import axios from 'axios';
import { pool } from '../db.js';

// <---- Controlador para el acceso, ya tiene export y lo puede importar donde lo necesite ---->
export const login = async ( req, res ) => {
    try {
        let { user, pass } = req.body

        const url = 'http://10.193.129.11:3000/auth/login'; // ruta de acceso de Sirep

        let Pk_Identificacion_SIREP
        let Nombre_SIREP
        let Tipo_Usuario_SIREP
        let Ficha_SIREP
        let informacion = {}

            // <---- Uso de axios para conectarse con el acceso de Sirep ---->
        await axios.post( url, { user: user, password: pass}).then(async response => {

            console.log(response)

                // <---- Validación de token ---->
            let key = response.data.token
            if ( !key ) return res.json({confirm: false, msj: 'La información es incorrecta'})

            Pk_Identificacion_SIREP = response.data.user.id;
            Nombre_SIREP = response.data.user.name;
            Ficha_SIREP = response.data.user.ficha;

            const roles = {
                // Estos son los cargos que maneja Sirep, los adapte para que sean mas faciles de manipular
                "Aprendiz":           "Aprendiz",
                "Donado":             "Aprendiz",
                "Instructor":         "Instructor",
                "Administrativo 1":   "Administrativo",
                "Administrativo 2":   "Administrativo",
                "Administrativo 3":   "Administrativo",
                "Auxiliar aseo":      "Administrativo",
                "Operarios":          "Administrativo",
                "Giras Especiales":   "Administrativo",
                "Visitas":            "Visitante",
                "Aprendiz Visitante": "Visitante"
            }
                // <-- En caso de reconocer el cargo, continua con el codigo -->
            await roles[response.data.user.cargo] ?? console.log('Alguien intento acceder con un cargo no conocido');
            Tipo_Usuario_SIREP = roles[response.data.user.cargo];

            informacion = { Pk_Identificacion_SIREP, Nombre_SIREP, Tipo_Usuario_SIREP, Ficha_SIREP}

            let sqlFind = `select * from usuarios where Pk_Identificacion = ${Pk_Identificacion_SIREP}`
            await pool.query(sqlFind, async(error,datos) => {
                if ( error ) console.log ('Error al constultar la base de datos');
                if ( datos.length > 0 ) return res.json({ valide: true, msj: 'Accedio un usuario ya registrado', datos});
                else {
                    let sqlInsert = `insert into usuarios (Pk_Identificacion, Nombre, Rol, Id_Ficha )
                    values('${Pk_Identificacion_SIREP}', '${Nombre_SIREP}', '${Tipo_Usuario_SIREP}','${Ficha_SIREP}')`

                    await pool.query( sqlInsert,(error, datos) => {
                        if ( error ) console.log ('Ocurrio un error de primer grado en login :>> \n', error);
                        else {
                            return res.json({valide: true, msj: 'Accedio un nuevo usuario', datos: informacion})
                        }
                    })
                }
            })

        }).catch(function (error) {
            console.error( 'Ocurrio un error de segundo en el login :>> \n' , error );
        });

    } catch (error) {
        console.error( 'Ocurrio un error de tercer grado en el login :>> \n' , error );
    }
}