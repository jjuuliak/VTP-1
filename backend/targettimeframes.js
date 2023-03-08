const db = require('./db');

function setupTargetTimeframesRoute(app) {
    app.post('/api/targettimeframes', async (req, res) => {
        const { target_id, planned_date, actual_date, comments, document_id } = req.body;
        try {
            const results = await db.query(
                'INSERT INTO targettimeframes (target_id, planned_date, actual_date, comments, document_id) VALUES (?, ?, ?, ?, ?)',
                [target_id, planned_date, actual_date, comments, document_id]
            );
            res.status(201).json({ id: results.insertId, target_id, planned_date, actual_date, comments, document_id });
        } catch (error) {
            res.status(500).json({ error: 'Error creating target timeframe' });
        }
    });

    app.get('/api/targettimeframes', async (req, res) => {
        try {
            const results = await db.query('SELECT * FROM targettimeframes');
            res.json(results);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching target timeframes' });
        }
    });

    app.put('/api/targettimeframes/:id', async (req, res) => {
        const { id } = req.params;
        const { target_id, planned_date, actual_date, comments, document_id } = req.body;
        try {
            const existingTargetTimeframe = await db.query('SELECT * FROM targettimeframes WHERE id = ?', [id]);
            if (existingTargetTimeframe.length === 0) {
                res.status(404).json({ error: `Target timeframe with id ${id} not found` });
                return;
            }
            await db.query(
                'UPDATE targettimeframes SET target_id = ?, planned_date = ?, actual_date = ?, comments = ?, document_id = ? WHERE id = ?',
                [target_id, planned_date, actual_date, comments, document_id, id]
            );
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: `Error updating target timeframe with id ${id}` });
        }
    });

    app.delete('/api/targettimeframes/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const existingTargetTimeframe = await db.query('SELECT * FROM targettimeframes WHERE id = ?', [id]);
            if (existingTargetTimeframe.length === 0) {
                res.status(404).json({ error: `Target timeframe with id ${id} not found` });
                return;
            }
            await db.query('DELETE FROM targettimeframes WHERE id = ?', [id]);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: `Error deleting target timeframe with id ${id}` });
        }
    });

    // Get a target timeframe by id
    app.get('/api/targettimeframes/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.query('SELECT * FROM targettimeframes WHERE id = ?', [id]);
            if (result.length === 0) {
                res.status(404).json({ error: `Target timeframe with id ${id} not found` });
                return;
            }
            res.json(result[0]);
        } catch (error) {
            console.error('Error getting target timeframe:', error);
            res.status(500).json({ error: 'Error getting target timeframe' });
        }
    });

    // Get target timeframes by target_id
    app.get('/api/targettimeframes/target/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.query('SELECT * FROM targettimeframes WHERE target_id = ?', [id]);
            res.json(result);
        } catch (error) {
            console.error('Error getting target timeframes:', error);
            res.status(500).json({ error: 'Error getting target timeframes' });
        }
    });

};

module.exports = setupTargetTimeframesRoute;