const express = require('express');
const db = require('./db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM drafts');
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const results = await db.query('SELECT * FROM drafts WHERE id = ?', [id]);
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.status(404).send('Draft not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/', async (req, res) => {
  const { title, body } = req.body;
  try {
    const result = await db.query('INSERT INTO drafts (title, body) VALUES (?, ?)', [title, body]);
    const newDraft = {
      id: result.insertId,
      title,
      body
    };
    res.send(newDraft);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body;
  try {
    const result = await db.query('UPDATE drafts SET title = ?, body = ? WHERE id = ?', [title, body, id]);
    if (result.affectedRows > 0) {
      const updatedDraft = {
        id: parseInt(id),
        title,
        body
      };
      res.send(updatedDraft);
    } else {
      res.status(404).send('Draft not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query('DELETE FROM drafts WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.send('Draft deleted');
    } else {
      res.status(404).send('Draft not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;