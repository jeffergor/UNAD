<script>
    document.addEventListener('DOMContentLoaded', function() {
        const listaPermisos = document.getElementById('listaPermisos');
        const negacionDialog = document.getElementById('negacionDialog');
        const cerrarDialog = document.getElementById('cerrarDialog');
        const enviarNegacion = document.getElementById('enviarNegacion');
        let permisoActual = null; // Variable para almacenar el permiso actual

        // Recupera los datos del localStorage
        let permisos = JSON.parse(localStorage.getItem('permisos')) || [];

        // Muestra los permisos en la página
        function mostrarPermisos() {
            listaPermisos.innerHTML = ''; // Limpia la lista antes de volver a llenarla
            permisos.forEach((permiso, index) => {
                const permisoDiv = document.createElement('div');
                permisoDiv.className = 'permiso';
                permisoDiv.dataset.index = index; // Guardar el índice para referencia futura
                permisoDiv.innerHTML = `
                    <h3>Permiso #${index + 1}</h3>
                    <p><strong>Trabajador:</strong> ${permiso.nombreTrabajador}</p>
                    <p><strong>Fecha de Inicio:</strong> ${permiso.fechaInicio}</p>
                    <p><strong>Fecha de Fin:</strong> ${permiso.fechaFin}</p>
                    <p><strong>Supervisor:</strong> ${permiso.supervisor}</p>
                    <p><strong>Status:</strong> ${permiso.estado}</p>
                    <button class="btn-aceptar">Aceptar</button>
                    <button class="btn-revision">Revisión</button>
                    <button class="btn-negar">Negar</button>
                    <button class="btn-eliminar">Eliminar</button>
                `;
                listaPermisos.appendChild(permisoDiv);
            });
        }

        mostrarPermisos(); // Muestra permisos al cargar la página

        // Funcionalidad para aceptar permisos
        listaPermisos.addEventListener('click', function(event) {
            const permisoDiv = event.target.closest('.permiso');
            const index = permisoDiv.dataset.index;

            if (event.target.classList.contains('btn-aceptar')) {
                permisoDiv.querySelector('p strong').innerText = 'Aceptado';
                permisos[index].estado = 'Aceptado';
                localStorage.setItem('permisos', JSON.stringify(permisos));
                mostrarPermisos(); // Actualiza la vista
            }

            // Funcionalidad para negar permisos
            if (event.target.classList.contains('btn-negar')) {
                negacionDialog.style.display = 'block';
                permisoActual = index; // Almacena el índice del permiso que se va a negar
            }

            // Funcionalidad para eliminar permisos
            if (event.target.classList.contains('btn-eliminar')) {
                permisos.splice(index, 1); // Elimina el permiso
                localStorage.setItem('permisos', JSON.stringify(permisos));
                mostrarPermisos(); // Actualiza la vista
            }
        });

        // Enviar negación de permisos
        enviarNegacion.addEventListener('click', function() {
            const motivoNegacion = document.getElementById('motivoNegacion').value;

            // Actualiza el estado del permiso actual y el motivo
            permisos[permisoActual].estado = 'Negado';
            permisos[permisoActual].motivo = motivoNegacion;

            // Guarda en localStorage y actualiza la vista
            localStorage.setItem('permisos', JSON.stringify(permisos));
            mostrarPermisos();

            // Cierra el diálogo de negación
            negacionDialog.style.display = 'none';
        });

        // Cerrar el diálogo de negación
        cerrarDialog.addEventListener('click', function() {
            negacionDialog.style.display = 'none';
        });
    });
</script>
