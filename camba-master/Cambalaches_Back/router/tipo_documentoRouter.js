const express = require('express');
const router = express.Router();
const { pool } = require('../app'); // Importa la pool de conexiones desde tu archivo app

// Consultar todos los registros de la tabla tipo_documento
router.get('/', (req, res) => {
    const query = 'SELECT * FROM tipo_documento';
    pool.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla tipo_documento`);
        }
    });
});

// Consultar por tipo de documento en la tabla tipo_documento
router.get('/:tdoc', (req, res) => {
    const { tdoc } = req.params;
    const query = `SELECT * FROM tipo_documento WHERE tdoc='${tdoc}'`;
    pool.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros asociados al tipo de documento en la tabla tipo_documento');
        }
    });
});

// Agregar un nuevo registro a la tabla tipo_documento
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO tipo_documento SET ?';
    pool.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla tipo_documento' });
        }

        res.json('Se insertó correctamente el registro en la tabla tipo_documento');
    });
});

// Actualizar un registro en la tabla tipo_documento
router.put('/actualizar/:tdoc', (req, res) => {
    const { tdoc } = req.params;
    const nuevosDatos = req.body;

    const query = `UPDATE tipo_documento SET ? WHERE tdoc='${tdoc}'`;
    pool.query(query, nuevosDatos, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar en la tabla tipo_documento' });
        }

        res.json('Se actualizó correctamente el registro en la tabla tipo_documento');
    });
});

// Borrar un registro de la tabla tipo_documento por tipo de documento
router.delete('/borrar/:tdoc', (req, res) => {
    const { tdoc } = req.params;

    const query = `DELETE FROM tipo_documento WHERE tdoc='${tdoc}'`;
    pool.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla tipo_documento' });
        }

        res.json('Se eliminó correctamente el registro en la tabla tipo_documento');
    });
});

module.exports = router;
