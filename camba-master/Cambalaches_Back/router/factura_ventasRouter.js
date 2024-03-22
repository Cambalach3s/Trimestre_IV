const express = require('express');
const router = express.Router();
const { pool } = require('../app'); // Importa la pool de conexiones desde tu archivo app

// Consultar todos los registros de la tabla factura_ventas
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM factura_ventas';
        const [rows, fields] = await pool.query(query);
        
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json('No hay registros en la tabla factura_ventas');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error en la consulta SQL' });
    }
});

// Consultar por número de factura en la tabla factura_ventas
router.get('/:n_factura_vent', async (req, res) => {
    try {
        const { n_factura_vent } = req.params;
        const query = `SELECT * FROM factura_ventas WHERE n_factura_vent='${n_factura_vent}'`;
        const [rows, fields] = await pool.query(query);
        
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json('No hay registros asociados al número de factura en la tabla factura_ventas');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error en la consulta SQL' });
    }
});

// Agregar un nuevo registro a la tabla factura_ventas
router.post('/agregar', async (req, res) => {
    try {
        const nuevoRegistro = req.body;
        const query = 'INSERT INTO factura_ventas SET ?';
        await pool.query(query, nuevoRegistro);
        res.json('Se insertó correctamente el registro en la tabla factura_ventas');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al insertar en la tabla factura_ventas' });
    }
});

// Actualizar un registro en la tabla factura_ventas
router.put('/actualizar/:n_factura_vent', async (req, res) => {
    try {
        const { n_factura_vent } = req.params;
        const nuevosDatos = req.body;
        const query = `UPDATE factura_ventas SET ? WHERE n_factura_vent='${n_factura_vent}'`;
        await pool.query(query, nuevosDatos);
        res.json('Se actualizó correctamente el registro en la tabla factura_ventas');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al actualizar en la tabla factura_ventas' });
    }
});

// Borrar un registro de la tabla factura_ventas por número de factura
router.delete('/borrar/:n_factura_vent', async (req, res) => {
    try {
        const { n_factura_vent } = req.params;
        const query = `DELETE FROM factura_ventas WHERE n_factura_vent='${n_factura_vent}'`;
        await pool.query(query);
        res.json('Se eliminó correctamente el registro en la tabla factura_ventas');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al eliminar en la tabla factura_ventas' });
    }
});

module.exports = router;
