const express = require('express');
const router = express.Router();
const { pool } = require('../app'); // Importa la pool de conexiones desde tu archivo app

// Consultar todos los registros de la tabla administrador
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM administrador';
        const [rows, fields] = await pool.query(query);
        
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json('No hay registros en la tabla administrador');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error en la consulta SQL' });
    }
});

// Consultar por ID en la tabla administrador
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM administrador WHERE id_admin=${id}`;
        const [rows, fields] = await pool.query(query);
        
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json('El ID no corresponde a ningún registro en la tabla administrador');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error en la consulta SQL' });
    }
});

// Agregar un nuevo registro a la tabla administrador
router.post('/agregar', async (req, res) => {
    try {
        const nuevoRegistro = req.body;
        const query = 'INSERT INTO administrador SET ?';
        await pool.query(query, nuevoRegistro);
        res.json('Se insertó correctamente el registro en la tabla administrador');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al insertar en la tabla administrador' });
    }
});

// Actualizar un registro en la tabla administrador
router.put('/actualizar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const nuevosDatos = req.body;
        const query = `UPDATE administrador SET ? WHERE id_admin=${id}`;
        await pool.query(query, nuevosDatos);
        res.json('Se actualizó correctamente el registro en la tabla administrador');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al actualizar en la tabla administrador' });
    }
});

// Borrar un registro de la tabla administrador
router.delete('/borrar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM administrador WHERE id_admin=${id}`;
        await pool.query(query);
        res.json('Se eliminó correctamente el registro en la tabla administrador');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al eliminar en la tabla administrador' });
    }
});

module.exports = router;
