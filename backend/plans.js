const express = require('express');
const db = require('./db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM plans');
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const results = await db.query('SELECT * FROM plans WHERE id = ?', [id]);
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.status(404).send('Plan not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await db.query('INSERT INTO plans (name, description) VALUES (?, ?)', [name, description]);
    const newPlan = {
      id: result.insertId,
      name,
      description
    };
    res.send(newPlan);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const result = await db.query('UPDATE plans SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    if (result.affectedRows > 0) {
      const updatedPlan = {
        id: parseInt(id),
        name,
        description
      };
      res.send(updatedPlan);
    } else {
      res.status(404).send('Plan not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('DELETE FROM plans WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.send('Plan deleted');
    } else {
      res.status(404).send('Plan not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;