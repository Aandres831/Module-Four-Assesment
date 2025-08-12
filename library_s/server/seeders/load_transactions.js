/* it is responssible for loanding users into the data base */
import fs from 'fs';
import path from 'path';
import  csv from  'csv-parser'
import { pool } from '../conexion_db.js';

export async function cargartransactionsALaBaseDeDatos(){
    const rutaArchivo = path.resolve('server/data/transactions.csv');
    const transactions = [];

    return new Promise ((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (fila) => {
                transactions.push([
                    fila.transaction_id,
                    fila.number_transaction,
                    fila.date_transaction,
                    fila.transaction_value,
                    fila.transaction_state,
                    fila.transaction_type,
                    fila.platform
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO transactions (transaction_id,number_transaction,date_transaction,transaction_value,transaction_state,transaction_type,platform) VALUES ?';
                    const [result] = await pool.query(sql, [transactions]);

                    console.log(`se insertaron ${result.affectedRows} transactions.`);
                    resolve();
                } catch (error) {
                    console.log('Error al insertar transactions:', error.message)
                    reject(error);
                }
            })
    })
}