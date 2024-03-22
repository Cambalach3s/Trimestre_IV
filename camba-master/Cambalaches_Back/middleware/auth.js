const { verifyToken } = require('../routers/generateToken');

const auth = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Falta el encabezado de autorización' });
        }

        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);

        if (tokenData && tokenData.IdUsuario) {
            // Si el token es válido y contiene el campo IdUsuario, permitir el acceso a la ruta
            next();
        } else {
            // Si el token no es válido o no contiene el campo IdUsuario, denegar el acceso
            return res.status(403).json({ error: 'Acceso denegado' });
        }
    } catch (error) {
        console.error('Error en el middleware de autenticación:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = auth;
