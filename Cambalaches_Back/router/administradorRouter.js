const express = require('express');
const router = express.Router();
const connection = require('../app'); // Importa tu conexión a la base de datos

// Consultar todos los registros de la tabla administrador
router.get('/', (req, res) => {
    const query = 'SELECT * FROM administrador';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla administrador`);
        }
    });
});

// Consultar por ID en la tabla administrador
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM administrador WHERE id_admin=${id}`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('El ID no corresponde a ningún registro en la tabla administrador');
        }
    });
});

// Agregar un nuevo registro a la tabla administrador
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO administrador SET ?';
    connection.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla administrador' });
        }

        res.json('Se insertó correctamente el registro en la tabla administrador');
    });
});

// Actualizar un registro en la tabla administrador
router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const nuevosDatos = req.body;

    const query = `UPDATE administrador SET ? WHERE id_admin=${id}`;
    connection.query(query, nuevosDatos, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar en la tabla administrador' });
        }

        res.json('Se actualizó correctamente el registro en la tabla administrador');
    });
});

// Borrar un registro de la tabla administrador
router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM administrador WHERE id_admin=${id}`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla administrador' });
        }

        res.json('Se eliminó correctamente el registro en la tabla administrador');
    });
});

module.exports = router;
