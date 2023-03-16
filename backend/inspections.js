// inspections.js

const db = require('./db');

function setupInspectionsRoute(app) {
    app.get('/api/inspections', async (req, res) => {
        try {
            const results = await db.query(
                `SELECT id,
                    subject_id as subjectId,
                    subject_of_inspection as subjectOfInspection,
                    issue,
                    risk_area as riskArea,
                    official_duration_period as officialDuration,
                    total_duration_period as totalDuration,
                    participants,
                    responsible_inspector as responsibleInspector,
                    office,
                    department,
                    subject_contact_information as subjectContactInformation,
                    inspection_contact_person as inspectionContactPerson
             FROM inspections`
            );
            res.json(results);
        } catch (error) {
            console.error('Error fetching inspections:', error);
            res.status(500).json({ error: 'Error fetching inspections' });
        }
    });

    app.get('/api/inspections/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const results = await db.query(
                `SELECT id,
                    subject_id as subjectId,
                    subject_of_inspection as subjectOfInspection,
                    issue,
                    risk_area as riskArea,
                    official_duration_period as officialDuration,
                    total_duration_period as totalDuration,
                    participants,
                    responsible_inspector as responsibleInspector,
                    office,
                    department,
                    subject_contact_information as subjectContactInformation,
                    inspection_contact_person as inspectionContactPerson
             FROM inspections
             WHERE id = ?`,
                [id]
            );
            if (results.length === 0) {
                res.status(404).json({ error: `Inspection with id ${id} not found` });
            } else {
                res.json(results[0]);
            }
        } catch (error) {
            console.error(`Error fetching inspection with id ${id}:`, error);
            res.status(500).json({ error: `Error fetching inspection with id ${id}` });
        }
    });

    app.post('/api/inspections', async (req, res) => {
        const {
            subjectId,
            subjectOfInspection,
            issue,
            riskArea,
            officialDuration,
            totalDuration,
            participants,
            responsibleInspector,
            office,
            department,
            subjectContactInformation,
            inspectionContactPerson,
        } = req.body;

        try {
            const results = await db.query(
                `INSERT INTO inspections (
               subject_id, subject_of_inspection, issue, risk_area,
               official_duration_period, total_duration_period,
               participants, responsible_inspector,
               office, department, subject_contact_information,
               inspection_contact_person
             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    subjectId,
                    subjectOfInspection,
                    issue,
                    riskArea,
                    officialDuration,
                    totalDuration,
                    participants,
                    responsibleInspector,
                    office,
                    department,
                    subjectContactInformation,
                    inspectionContactPerson,
                ]
            );

            const insertedInspection = await db.query(
                `SELECT id,
                    subject_id as subjectId,
                    subject_of_inspection as subjectOfInspection,
                    issue,
                    risk_area as riskArea,
                    official_duration_period as officialDuration,
                    total_duration_period as totalDuration,
                    participants,
                    responsible_inspector as responsibleInspector,
                    office,
                    department,
                    subject_contact_information as subjectContactInformation,
                    inspection_contact_person as inspectionContactPerson
             FROM inspections
             WHERE id = ?`,
                [results.insertId]
            );

            res.status(201).json(insertedInspection[0]);
        } catch (error) {
            console.error('Error creating inspection:', error);
            res.status(500).json({ error: 'Error creating inspection' });
        }
    });

    app.delete('/api/inspections/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const existingInspection = await db.query('SELECT * FROM inspections WHERE id = ?', [id]);
            if (existingInspection.length === 0) {
                res.status(404).json({ error: `Inspection with id ${id} not found` });
                return;
            }
            await db.query('DELETE FROM inspections WHERE id = ?', [id]);
            res.sendStatus(204);
        } catch (error) {
            console.error(`Error deleting inspection with id ${id}:`, error);
            res.status(500).json({ error: `Error deleting inspection with id ${id}` });
        }
    });

    app.get('/api/inspections/subject/:subjectId', async (req, res) => {
        const { subjectId } = req.params;
        try {
            const results = await db.query(
                `SELECT id,
                    subject_id as subjectId,
                    subject_of_inspection as subjectOfInspection,
                    issue,
                    risk_area as riskArea,
                    official_duration_period as officialDuration,
                    total_duration_period as totalDuration,
                    participants,
                    responsible_inspector as responsibleInspector,
                    office,
                    department,
                    subject_contact_information as subjectContactInformation,
                    inspection_contact_person as inspectionContactPerson
             FROM inspections
             WHERE subject_id = ?`,
                [subjectId]
            );
            res.json(results);
        } catch (error) {
            console.error(`Error fetching inspections with subjectId ${subjectId}:`, error);
            res.status(500).json({ error: `Error fetching inspections with subjectId ${subjectId}` });
        }
    });

}

module.exports = setupInspectionsRoute;
