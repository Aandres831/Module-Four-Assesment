/* it is responssible for loanding users into the data base */
import fs from 'fs';
import path from 'path';
import  csv from  'csv-parser'
import { pool } from '../conexion_db.js';

export async function cargarinvoicesALaBaseDeDatos(){
    const rutaArchivo = path.resolve('server/data/invoices.csv');
    const invoices = [];

    return new Promise ((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (fila) => {
                invoices.push([
                    fila.invoice_id,
                    fila.number_bill,
                    fila.billing_period,
                    fila.billed_amount,
                    fila.amount_paid
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO invoices (invoice_id,number_bill,billing_period,billed_amount,amount_paid) VALUES ?';
                    const [result] = await pool.query(sql, [invoices]);

                    console.log(`se insertaron ${result.affectedRows} invoices.`);
                    resolve();
                } catch (error) {
                    console.log('Error al insertar invoices:', error.message)
                    reject(error);
                }
            })
    })
}