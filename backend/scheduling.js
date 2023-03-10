const db = require('./db');

function setupSchedulingRoute(app) {
  app.post('/api/scheduling', async (req, res) => {
    const { event, person, week } = req.body;
    try {
      const results = await db.query(
        'INSERT INTO scheduling (event, person, week) VALUES (?, ?, ?)',
        [event, person, week]
      );
      res.status(201).json({ id: results.insertId, event, person, week });
    } catch (error) {
      res.status(500).json({ error: 'Error creating scheduling' });
    }
  });

  app.get('/api/scheduling', async (req, res) => {
    try {
      const results = await db.query('SELECT * FROM scheduling');
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching scheduling' });
    }
  });

  app.put('/api/scheduling/:id', async (req, res) => {
    const { id } = req.params;
    const { event, person, week } = req.body;
    try {
      const existingScheduling = await db.query('SELECT * FROM scheduling WHERE id = ?', [id]);
      if (existingScheduling.length === 0) {
        res.status(404).json({ error: `Scheduling with id ${id} not found` });
        return;
      }
      await db.query(
        'UPDATE scheduling SET event = ?, person = ?, week = ? WHERE id = ?',
        [event, person, week, id]
      );
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: `Error updating scheduling with id ${id}` });
    }
  });

  app.delete('/api/scheduling/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const existingScheduling = await db.query('SELECT * FROM scheduling WHERE id = ?', [id]);
      if (existingScheduling.length === 0) {
        res.status(404).json({ error: `Scheduling with id ${id} not found` });
        return;
      }
      await db.query('DELETE FROM scheduling WHERE id = ?', [id]);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: `Error deleting scheduling with id ${id}` });
    }
  });

  app.get('/api/scheduling/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('SELECT * FROM scheduling WHERE id = ?', [id]);
      if (result.length === 0) {
        res.status(404).json({ error: `Scheduling with id ${id} not found` });
        return;
      }
      res.json(result[0]);
    } catch (error) {
      console.error('Error getting scheduling:', error);
      res.status(500).json({ error: 'Error getting scheduling' });
    }
  });
 
};

module.exports = setupSchedulingRoute;
