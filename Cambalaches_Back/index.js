const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Importa las rutas
const usuariosRoutes = require('./router/usuariosRouter');
const productosRoutes = require('./router/productosRouter');
const categoriasRoutes = require('./router/categoriasRouter');
const facturaRoutes = require('./router/facturaRouter');
const administradorRoutes = require('./router/administradorRouter');
const compradorRoutes = require('./router/compradorRouter');
const facturaVentasRoutes = require('./router/factura_ventasRouter');
const facturaProductosRoutes = require('./router/factura_productosRouter');
const rolesRoutes = require('./router/rolesRouter');
const tiendaRoutes = require('./router/tiendaRouter');
const tipoDocumentoRoutes = require('./router/tipo_documentoRouter');
const usuarioRolesRoutes = require('./router/usuario_has_rolesRouter');
const login = require('./router/login');

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de las rutas
app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/factura', facturaRoutes);
app.use('/administrador', administradorRoutes);
app.use('/comprador', compradorRoutes);
app.use('/factura_venta', facturaVentasRoutes);
app.use('/factura_productos', facturaProductosRoutes);
app.use('/roles', rolesRoutes);
app.use('/tienda', tiendaRoutes);
app.use('/tipo_documento', tipoDocumentoRoutes);
app.use('/usuario_has_roles', usuarioRolesRoutes);
app.use('/login', login);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Cambalaches funcionando correctamente');
});

// Escucha el servidor en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;
