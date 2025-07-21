// 1. Importaciones
const express = require('express');
const path = 'path';
const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares
// Para servir archivos estáticos (HTML, CSS, JS del frontend)
app.use(express.static('public'));
// Para poder entender los cuerpos de las solicitudes en formato JSON
app.use(express.json());

// 3. Rutas
// Importamos y usamos el enrutador de usuarios
const usuariosRouter = require('./routes/usuarios');
app.use('/usuarios', usuariosRouter);

// Ruta principal para servir el frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});