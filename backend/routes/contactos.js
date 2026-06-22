const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/contactos - Obtener todos los contactos (con filtros opcionales)
router.get('/', async (req, res) => {
  try {
    const { piso, search } = req.query;
    let query = 'SELECT * FROM contactos';
    const params = [];
    const conditions = [];

    if (piso) {
      conditions.push('piso = ?');
      params.push((piso));
    }

    if (search) {
      conditions.push('(nombre LIKE ? OR area LIKE ? OR interno LIKE ?)');
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY piso ASC, nombre ASC';

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
});

// GET /api/contactos/pisos - Obtener lista de pisos disponibles
router.get('/pisos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT piso FROM contactos ORDER BY piso ASC');
    res.json(rows.map(r => r.piso));
  } catch (error) {
    console.error('Error al obtener pisos:', error);
    res.status(500).json({ error: 'Error al obtener pisos' });
  }
});

// POST /api/contactos - Crear un nuevo contacto
router.post('/', async (req, res) => {
  try {
    const { nombre, area, piso, interno } = req.body;

    if (!nombre || !area || !piso || !interno) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const [result] = await pool.query(
      'INSERT INTO contactos (nombre, area, piso, interno) VALUES (?, ?, ?, ?)',
      [nombre, area, (piso), interno]
    );

    const [nuevo] = await pool.query('SELECT * FROM contactos WHERE id = ?', [result.insertId]);
    res.status(201).json(nuevo[0]);
  } catch (error) {
    console.error('Error al crear contacto:', error);
    res.status(500).json({ error: 'Error al crear contacto' });
  }
});

// PUT /api/contactos/:id - Actualizar un contacto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, area, piso, interno } = req.body;

    if (!nombre || !area || !piso || !interno) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    await pool.query(
      'UPDATE contactos SET nombre = ?, area = ?, piso = ?, interno = ? WHERE id = ?',
      [nombre, area, (piso), interno, parseInt(id)]
    );

    const [actualizado] = await pool.query('SELECT * FROM contactos WHERE id = ?', [parseInt(id)]);
    if (actualizado.length === 0) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }
    res.json(actualizado[0]);
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    res.status(500).json({ error: 'Error al actualizar contacto' });
  }
});

// DELETE /api/contactos/:id - Eliminar un contacto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM contactos WHERE id = ?', [parseInt(id)]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    res.json({ message: 'Contacto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    res.status(500).json({ error: 'Error al eliminar contacto' });
  }
});

module.exports = router;
