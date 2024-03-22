const { verifyToken } = require('../routers/generateToken');
const conexion = require('../conexion');

const roleAuth = (roles) => async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ error: 'Falta el encabezado de autorización' });
        }

        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);

        const userData = `SELECT * FROM usuario WHERE id_usuario = ?`;
        conexion.query(userData, [tokenData.id_usuario], (error, resultado) => {
            if (error) {
                console.error('Error en la consulta de usuario:', error);
                return res.status(500).json({ error: 'Error en el servidor' });
            }

            if (resultado.length > 0) {
                const userRole = resultado[0].Rol_IdRol;
                if ([].concat(roles).includes(userRole)) {
                    next();
                } else {
                    res.status(403).json({ error: 'Permisos insuficientes para acceder a esta ruta' });
                }
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        });
    } catch (error) {
        console.error('Error en el middleware de autenticación de roles:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = roleAuth;
