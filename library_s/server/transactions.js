const API_URL = "http://localhost:3006/transactions";
const tableTransactions = document.getElementById("tableTransactions");
const transactionForm = document.getElementById("transactionForm");

// Cargar lista de transactions
async function cargarTransactions() {
    const res = await fetch(API_URL);
    const data = await res.json();

    tableTransactions.innerHTML = "";
    data.forEach(transaction => {
        tableTransactions.innerHTML += `
            <tr>
                <td>${transaction.isbn}</td>
                <td>${transaction.titulo}</td>
                <td>${transaction.autor}</td>
                <td>${transaction.fecha_publicacion ? transaction.fecha_publicacion.split("T")[0] : ""}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editartransaction('${transaction.isbn}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminartransaction('${transaction.isbn}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Guardar / Actualizar transaction
transactionForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const transaction = {
        transaction_id: document.getElementById("transaction_id").value,
        number_transaction: document.getElementById("number_transaction").value,
        date_transaction: document.getElementById("date_transaction").value,
        transaction_value: document.getElementById("transaction_value").value,
        transaction_state: document.getElementById("transaction_state").value,
        transaction_type: document.getElementById("transaction_type").value,
        platform: document.getElementById("platform").value
    };

    const transaction_id = document.getElementById("transaction_id").value;

    if (transaction_id) {
        // Actualizar
        await fetch(`${API_URL}/${transaction.transaction_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction)
        });
    } else {
        // Crear
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction)
        });
    }

    transactionForm.reset();
    document.getElementById("transaction_id").value = "";
    cargartransactions();
});

// Editar transaction
window.editartransaction = async (transaction_id) => {
    const res = await fetch(`${API_URL}/${isbn}`);
    const transaction = await res.json();

    document.getElementById("transaction_id").value = transaction.isbn;
    document.getElementById("isbn").value = transaction.isbn;
    document.getElementById("titulo").value = transaction.titulo;
    document.getElementById("autor").value = transaction.autor;
    document.getElementById("fecha_publicacion").value = transaction.fecha_publicacion ? transaction.fecha_publicacion.split("T")[0] : "";
};

// Eliminar transaction
window.eliminartransaction = async (isbn) => {
    if (confirm("¿Seguro que quieres eliminar esta transaction?")) {
        await fetch(`${API_URL}/${isbn}`, { method: "DELETE" });
        cargartransactions();
    }
};

// Inicializar
cargartransactions();