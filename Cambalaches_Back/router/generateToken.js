// generateToken.js

// Importa el módulo jsonwebtoken
const jwt = require('jsonwebtoken');

// Función para generar un token de sesión
const tokenSign = async (usuario) => {
    try {
        // Genera el token utilizando jsonwebtoken
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'secreto', { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error('Error al generar el token');
    }
};

// Exporta la función tokenSign para que pueda ser utilizada en otros archivos
module.exports = { tokenSign };
