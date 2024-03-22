const express = require('express');
const router = express.Router();
const { pool } = require('../app'); // Importa la pool de conexiones desde tu archivo app

// Consultar todos los registros de la tabla factura
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM factura';
        const [rows, fields] = await pool.query(query);
        
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json('No hay registros en la tabla factura');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error en la consulta SQL' });
    }
});

// Consultar por número de factura en la tabla factura
router.get('/:n_factura', async (req, res) => {
    try {
        const { n_factura } = req.params;
        const query = `SELECT * FROM factura WHERE n_factura='${n_factura}'`;
        const [rows, fields] = await pool.query(query);
        
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json('No hay registros asociados al número de factura en la tabla factura');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error en la consulta SQL' });
    }
});

// Agregar un nuevo registro a la tabla factura
router.post('/agregar', async (req, res) => {
    try {
        const nuevoRegistro = req.body;
        const query = 'INSERT INTO factura SET ?';
        await pool.query(query, nuevoRegistro);
        res.json('Se insertó correctamente el registro en la tabla factura');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al insertar en la tabla factura' });
    }
});

// Actualizar un registro en la tabla factura
router.put('/actualizar/:n_factura', async (req, res) => {
    try {
        const { n_factura } = req.params;
        const nuevosDatos = req.body;
        const query = `UPDATE factura SET ? WHERE n_factura='${n_factura}'`;
        await pool.query(query, nuevosDatos);
        res.json('Se actualizó correctamente el registro en la tabla factura');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al actualizar en la tabla factura' });
    }
});

// Borrar un registro de la tabla factura por número de factura
router.delete('/borrar/:n_factura', async (req, res) => {
    try {
        const { n_factura } = req.params;
        const query = `DELETE FROM factura WHERE n_factura='${n_factura}'`;
        await pool.query(query);
        res.json('Se eliminó correctamente el registro en la tabla factura');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al eliminar en la tabla factura' });
    }
});

module.exports = router;
