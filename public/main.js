document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const responseMessageDiv = document.getElementById('response-message');
    const errorMessageDiv = document.getElementById('error-message');
    const historyList = document.getElementById('history-list');


    const fetchHistory = async () => {
        try {
            const response = await fetch('/usuarios');
            const registros = await response.json();

            historyList.innerHTML = '';

            if (registros.length === 0) {
                historyList.innerHTML = '<li>Aún no hay registros.</li>';
                return;
            }

            registros.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `👤 Nombre: ${user.nombre}, Edad: ${user.edad}, Ciudad: ${user.ciudad}`;
                historyList.appendChild(li);
            });

        } catch (error) {
            console.error('Error al obtener el historial:', error);
            historyList.innerHTML = '<li>Error al cargar el historial.</li>';
        }
    };

  
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        
        responseMessageDiv.classList.add('hidden');
        errorMessageDiv.classList.add('hidden');

        const nombre = document.getElementById('nombre').value;
        const edad = document.getElementById('edad').value;
        const ciudad = document.getElementById('ciudad').value;

        try {
            const response = await fetch('/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, edad, ciudad }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Ocurrió un error.');
            }
            responseMessageDiv.textContent = result.message;
            responseMessageDiv.classList.remove('hidden');
            
            form.reset();
            await fetchHistory();

        } catch (error) {

            errorMessageDiv.textContent = error.message;
            errorMessageDiv.classList.remove('hidden');
            console.error('Error al registrar usuario:', error);
        }
    });

    fetchHistory();
});