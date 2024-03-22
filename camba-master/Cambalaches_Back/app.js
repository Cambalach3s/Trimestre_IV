const mysql = require('mysql2');

// Configuración de la pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cambalaches',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); // Agrega .promise() al final

// Prueba de conexión a la base de datos
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Detener la ejecución del servidor
  }
  console.log('Conexión a la base de datos establecida');
  connection.release(); // Liberar la conexión para que pueda ser utilizada por otros
});

module.exports = pool;
