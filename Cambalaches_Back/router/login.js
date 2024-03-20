const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const pool = require('../app'); // Importa la conexión compatible con promesas
const { tokenSign } = require('./generateToken');
const cors = require('cors');

router.use(cors());

router.get('/', (req, res) => {
    res.status(405).json({ error: 'No se permite el método GET en esta ruta' });
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    console.log('Datos recibidos:', email, password);

    try {
        const result = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        const rows = result[0]; 

        if (!rows || rows.length === 0) { // Verifica si el resultado está vacío o no existe
            return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }

        const usuario = rows[0]; 

        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }

        const tokenSession = await tokenSign(usuario);
        res.json(tokenSession);
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
