const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const registrosFilePath = path.join(__dirname, '..', 'data', 'registros.json');

const leerRegistros = async () => {
    try {

        await fs.mkdir(path.dirname(registrosFilePath), { recursive: true });
    
        const data = await fs.readFile(registrosFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {

        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
};


const escribirRegistros = async (registros) => {
    await fs.writeFile(registrosFilePath, JSON.stringify(registros, null, 2), 'utf8');
};

// RUTA POST /usuarios: Para registrar una nueva persona
router.post('/', async (req, res) => {
    const { nombre, edad, ciudad } = req.body;

    // Validacion en el servidor
    if (!nombre || !edad || !ciudad) {
        return res.status(400).json({ message: 'Error: Todos los campos son obligatorios.' });
    }

    const edadNum = parseInt(edad, 10);
    if (isNaN(edadNum) || edadNum <= 0) {
        return res.status(400).json({ message: 'Error: La edad debe ser un número positivo.' });
    }

    try {
        const registros = await leerRegistros();
        const nuevoRegistro = { nombre, edad: edadNum, ciudad, timestamp: new Date() };
        registros.push(nuevoRegistro);
        await escribirRegistros(registros);

        // Respuesta personalizada
        const estatusEdad = edadNum >= 18 ? 'Eres mayor de edad.' : 'Eres menor de edad.';
        const mensaje = `Hola ${nombre} de ${ciudad}, tienes ${edadNum} años. ${estatusEdad}`;

        res.status(201).json({ message: mensaje });

    } catch (error) {
        console.error('Error al guardar el registro:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// RUTA GET /usuarios: Para obtener todos los registros
router.get('/', async (req, res) => {
    try {
        const registros = await leerRegistros();
        // Devolver los registros ordenados desde el más reciente al más antiguo
        res.status(200).json(registros.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    } catch (error) {
        console.error('Error al leer los registros:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

module.exports = router;