const express = require('express');
const router = express.Router();
const { pool } = require('../app'); // Importa la pool de conexiones desde tu archivo app

// Consultar todos los registros de la tabla comprador
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM comprador';
        const [rows, fields] = await pool.query(query);
        
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json('No hay registros en la tabla comprador');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error en la consulta SQL' });
    }
});

// Consultar por ID en la tabla comprador
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM comprador WHERE id_comprador=${id}`;
        const [rows, fields] = await pool.query(query);
        
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json('El ID no corresponde a ningún registro en la tabla comprador');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error en la consulta SQL' });
    }
});

// Agregar un nuevo registro a la tabla comprador
router.post('/agregar', async (req, res) => {
    try {
        const nuevoRegistro = req.body;
        const query = 'INSERT INTO comprador SET ?';
        await pool.query(query, nuevoRegistro);
        res.json('Se insertó correctamente el registro en la tabla comprador');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al insertar en la tabla comprador' });
    }
});

// Actualizar un registro en la tabla comprador
router.put('/actualizar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const nuevosDatos = req.body;
        const query = `UPDATE comprador SET ? WHERE id_comprador=${id}`;
        await pool.query(query, nuevosDatos);
        res.json('Se actualizó correctamente el registro en la tabla comprador');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al actualizar en la tabla comprador' });
    }
});

// Borrar un registro de la tabla comprador
router.delete('/borrar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM comprador WHERE id_comprador=${id}`;
        await pool.query(query);
        res.json('Se eliminó correctamente el registro en la tabla comprador');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al eliminar en la tabla comprador' });
    }
});

module.exports = router;
