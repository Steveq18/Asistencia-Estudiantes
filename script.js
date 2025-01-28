const nombreInput = document.getElementById('nombreEstudiante');
const agregarBtn = document.getElementById('agregarEstudiante');
const listaEstudiantes = document.getElementById('listaEstudiantes');
const mostrarResumenBtn = document.getElementById('mostrarResumen');
const resumenContainer = document.getElementById('resumenAsistencia');

let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];

// Guardar en el localStorage
function guardarLocal() {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
}

// Mostrar la lista de estudiantes
function mostrarLista() {
    listaEstudiantes.innerHTML = ''; // Limpiar la tabla antes de actualizar
    estudiantes.forEach((estudiante, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${estudiante.nombre}</td>
            <td>
                <button class="btn-presente" onclick="marcarAsistencia(${index}, 'Presente')">Presente</button>
                <button class="btn-ausente" onclick="marcarAsistencia(${index}, 'Ausente')">Ausente</button>
            </td>
            <td>${estudiante.fecha || ''}</td>
            <td>
                <button class="btn-eliminar" onclick="eliminarEstudiante(${index})">Eliminar</button>
            </td>
        `;

        listaEstudiantes.appendChild(fila);
    });
}

// Agregar un estudiante
function agregarEstudiante() {
    const nombre = nombreInput.value.trim();
    if (nombre === '') {
        alert('Por favor, ingresa un nombre.');
        return;
    }
    estudiantes.push({ nombre, estado: '', fecha: '' });
    guardarLocal();
    mostrarLista();
    nombreInput.value = '';
}

// Marcar asistencia
function marcarAsistencia(index, estado) {
    estudiantes[index].estado = estado;
    estudiantes[index].fecha = new Date().toLocaleDateString();
    guardarLocal();
    mostrarLista();
}

// Eliminar estudiante
function eliminarEstudiante(index) {
    estudiantes.splice(index, 1);
    guardarLocal();
    mostrarLista();
}

// Mostrar resumen
function mostrarResumen() {
    resumenContainer.innerHTML = '';
    estudiantes.forEach((estudiante) => {
        const p = document.createElement('p');
        p.textContent = `${estudiante.nombre}: ${estudiante.estado} (Fecha: ${estudiante.fecha || 'N/A'})`;
        resumenContainer.appendChild(p);
    });
    resumenContainer.setAttribute('aria-live', 'polite');
}

// Eventos iniciales
agregarBtn.addEventListener('click', agregarEstudiante);
mostrarResumenBtn.addEventListener('click', mostrarResumen);

// Mostrar la lista al cargar la página
mostrarLista();
