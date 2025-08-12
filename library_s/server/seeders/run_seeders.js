import { cargartransactionsALaBaseDeDatos } from "./load_transactions.js"
import { cargarinvoicesALaBaseDeDatos } from "./load_invoices.js"
// import { cargarusersALaBaseDeDatos } from "./load_usuarios.js"

/* it is responsabilies for calling the loads */
(async () => {
  try {
    console.log('Iniciando seedes...')

    // await cargarusersALaBaseDeDatos()
    await cargartransactionsALaBaseDeDatos()
    await cargarinvoicesALaBaseDeDatos()

    console.log('Todos los seeders ejecutados correctamente');
    
  } catch (error) {
    console.log('Error ejecutando los seedes:', error.message);
  } finally {
    process.exit();
  }
}) ()