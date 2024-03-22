const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { pool } = require('../app'); // Importa la pool de conexiones desde tu archivo app

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar si se proporcionaron correo y contraseña
        if (!email || !password) {
            return res.status(400).json({ error: 'Por favor, proporciona un correo y una contraseña.' });
        }

        // Obtener el usuario de la base de datos
        const query = 'SELECT * FROM usuario WHERE email = ?';
        const [rows] = await pool.query(query, [email]);

        if (!rows || !rows.length) {
            return res.status(401).json({ error: 'Credenciales inválidas. Por favor, inténtalo de nuevo.' });
        }

        // Verificar la contraseña
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas. Por favor, inténtalo de nuevo.' });
        }

        // Generar un token de sesión con expiración de 20 minutos
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '20m' });

        res.json({ token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.' });
    }
});

module.exports = router;
