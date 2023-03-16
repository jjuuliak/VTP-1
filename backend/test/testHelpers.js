const db = require('../db');

// async function insertSampleData() {
//     const sampleData = [
//         {
//             subject_id: 1,
//             subject_of_inspection: 'Sample Subject 1',
//             issue: 'Sample Issue 1',
//             risk_area: 'Sample Risk Area 1',
//             official_duration_period: '2023-01-01-2023-01-05',
//             total_duration_period: '2023-01-01-2023-01-07',
//             participants: 'John Doe, Jane Smith',
//             responsible_inspector: 'Inspector Gadget',
//             office: 'Sample Office 1',
//             department: 'Sample Department 1',
//             subject_contact_information: 'sample1@example.com',
//             inspection_contact_person: 'Contact Person 1',
//         },
//         // Add more sample data objects as needed
//     ];

//     for (const inspection of sampleData) {
//         const {
//             subject_id,
//             subject_of_inspection,
//             issue,
//             risk_area,
//             official_duration_period,
//             total_duration_period,
//             participants,
//             responsible_inspector,
//             office,
//             department,
//             subject_contact_information,
//             inspection_contact_person,
//         } = inspection;

//         await db.query(
//             `INSERT INTO inspection_information (
//         subject_id, subject_of_inspection, issue, risk_area, official_duration_period,
//         total_duration_period, participants, responsible_inspector, office, department,
//         subject_contact_information, inspection_contact_person
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 subject_id,
//                 subject_of_inspection,
//                 issue,
//                 risk_area,
//                 official_duration_period,
//                 total_duration_period,
//                 participants,
//                 responsible_inspector,
//                 office,
//                 department,
//                 subject_contact_information,
//                 inspection_contact_person,
//             ]
//         );
//     }
// }

// async function clearSampleData() {
//     await db.query('DELETE FROM inspection_information');
// }
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
