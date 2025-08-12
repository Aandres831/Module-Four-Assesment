const API_URL = "http://localhost:3006/users";
const tablaUsuarios = document.getElementById("tablaUsuarios");
const usuarioForm = document.getElementById("usuarioForm");

// Cargar lista de usuarios
async function cargarUsuarios() {
    const res = await fetch(API_URL);
    const data = await res.json();

    tablaUsuarios.innerHTML = "";
    data.forEach(u => {
        tablaUsuarios.innerHTML += `
            <tr>
                <td>${u.user_id}</td>
                <td>${u.name}</td>
                <td>${u.identification}</td>
                <td>${u.address}</td>
                <td>${u.cellphonne_number}</td>
                <td>${u.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarUsuario(${u.user_id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${u.user_id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Guardar / Actualizar usuario
usuarioForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = {
        nombre_completo: document.getElementById("nombre_completo").value,
        identificacion: document.getElementById("identificacion").value,
        correo: document.getElementById("correo").value,
        contrasena: document.getElementById("contrasena").value,
        telefono: document.getElementById("telefono").value
    };

    const user_id = document.getElementById("user_id").value;

    if (user_id) {
        // UPDATE
        await fetch(`${API_URL}/${user_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
    } else {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
    }

    usuarioForm.reset();
    cargarUsuarios();
});

// Editar usuario
window.editarUsuario = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const u = await res.json();

    document.getElementById("user_id").value = u.user_id;
    document.getElementById("nombre_completo").value = u.name;
    document.getElementById("identificacion").value = u.identification;
    document.getElementById("direccion").value = u.address;
    document.getElementById("telefono").value = u.cellphonne_number;
    document.getElementById("email").value = u.email;
};

// Eliminar usuario
window.eliminarUsuario = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarUsuarios();
    }
};

// Inicializar
cargarUsuarios();