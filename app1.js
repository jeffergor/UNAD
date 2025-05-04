// app.js
document.getElementById('permisoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreTrabajador = document.getElementById('nombreTrabajador').value;
    const descripcionTrabajo = document.getElementById('descripcionTrabajo').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const supervisor = document.getElementById('supervisor').value;

    const permiso = `
        <div class="permiso">
            <h3>Permiso de Trabajo para ${nombreTrabajador}</h3>
            <p><strong>Descripción:</strong> ${descripcionTrabajo}</p>
            <p><strong>Fecha de Inicio:</strong> ${fechaInicio}</p>
            <p><strong>Fecha de Fin:</strong> ${fechaFin}</p>
            <p><strong>Supervisor:</strong> ${supervisor}</p>
        </div>
    `;

    document.getElementById('listaPermisos').innerHTML += permiso;

    // Limpiar formulario
    document.getElementById('permisoForm').reset();
});
