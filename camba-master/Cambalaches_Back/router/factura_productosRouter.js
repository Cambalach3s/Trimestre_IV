const express = require('express');
const router = express.Router();
const { pool } = require('../app'); // Importa la pool de conexiones desde tu archivo app

// Consultar todos los registros de la tabla factura_productos
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM factura_productos';
        const [rows, fields] = await pool.query(query);
        
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json('No hay registros en la tabla factura_productos');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error en la consulta SQL' });
    }
});

// Consultar por ID de factura en la tabla factura_productos
router.get('/:id_factura', async (req, res) => {
    try {
        const { id_factura } = req.params;
        const query = `SELECT * FROM factura_productos WHERE fk_pk_n_factura=${id_factura}`;
        const [rows, fields] = await pool.query(query);
        
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json('No hay registros asociados a la factura en la tabla factura_productos');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error en la consulta SQL' });
    }
});

// Agregar un nuevo registro a la tabla factura_productos
router.post('/agregar', async (req, res) => {
    try {
        const nuevoRegistro = req.body;
        const query = 'INSERT INTO factura_productos SET ?';
        await pool.query(query, nuevoRegistro);
        res.json('Se insertó correctamente el registro en la tabla factura_productos');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al insertar en la tabla factura_productos' });
    }
});

// Actualizar un registro en la tabla factura_productos
router.put('/actualizar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const nuevosDatos = req.body;
        const query = `UPDATE factura_productos SET ? WHERE fk_pk_n_factura=${id}`;
        await pool.query(query, nuevosDatos);
        res.json('Se actualizó correctamente el registro en la tabla factura_productos');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al actualizar en la tabla factura_productos' });
    }
});

// Borrar registros de la tabla factura_productos asociados a una factura
router.delete('/borrar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM factura_productos WHERE fk_pk_n_factura=${id}`;
        await pool.query(query);
        res.json('Se eliminaron correctamente los registros asociados a la factura en la tabla factura_productos');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al eliminar en la tabla factura_productos' });
    }
});

module.exports = router;
