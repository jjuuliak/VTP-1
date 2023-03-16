const db = require('../db');

const insertSampleData = async () => {
    await db.query(
        `INSERT INTO inspections (subject_id, subject_of_inspection, issue, risk_area, official_duration_period, total_duration_period, participants, responsible_inspector, office, department, subject_contact_information, inspection_contact_person)
       VALUES (1, 'Test Subject', 'Test Issue', 'Test Risk Area', '2023-03-01-2023-03-15', '2023-03-01-2023-03-30', 'Test Participant 1, Test Participant 2', 'Test Inspector', 'Test Office', 'Test Department', 'Test Contact Info', 'Test Contact Person')`
    );
};

const clearSampleData = async () => {
    await db.query("DELETE FROM inspections WHERE subject_of_inspection = 'Test Subject'");
};

module.exports = {
    insertSampleData,
    clearSampleData,
};
