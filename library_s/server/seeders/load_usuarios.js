/* it is responssible for loanding users into the data base */
import fs from 'fs';
import path from 'path';
import  csv from  'csv-parser'
import { pool } from '../conexion_db.js';

export async function cargarusersALaBaseDeDatos(){
    const rutaArchivo = path.resolve('server/data/users.csv');
    const users = [];

    return new Promise ((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (fila) => {
                users.push([
                    fila.user_id,
                    fila.name,
                    fila.identification,
                    fila.address,
                    fila.cellphonne_number,
                    fila.email
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO users (user_id,name,identification,address,cellphonne_number,email) VALUES ?';
                    const [result] = await pool.query(sql, [users]);

                    console.log(`se insertaron ${result.affectedRows} users.`);
                    resolve();
                } catch (error) {
                    console.log('Error al insertar users:', error.message)
                    reject(error);
                }
            })
    })
}