const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'mydatabase',
  multipleStatements: true
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  const draftsSql = `
    CREATE TABLE IF NOT EXISTS drafts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL
    );

    INSERT INTO drafts (title, body) VALUES ('Draft 1', 'This is the first draft.');
    INSERT INTO drafts (title, body) VALUES ('Draft 2', 'This is the second draft.');
    INSERT INTO drafts (title, body) VALUES ('Draft 3', 'This is the third draft.');
  `;

  const plansSql = `
    CREATE TABLE IF NOT EXISTS plans (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL
    );

    INSERT INTO plans (name, description) VALUES ('Plan 1', 'This is the first plan.');
    INSERT INTO plans (name, description) VALUES ('Plan 2', 'This is the second plan.');
    INSERT INTO plans (name, description) VALUES ('Plan 3', 'This is the third plan.');
  `;

  const documentsSql = `
    CREATE TABLE IF NOT EXISTS documents (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      handler VARCHAR(255),
      modified DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO documents (title, handler, modified) VALUES ('Document 1', 'Setä Manula', '2022-01-31 00:00:00');
    INSERT INTO documents (title, handler, modified) VALUES ('Document 2', 'Jane Doe', '2022-01-29 00:00:00');
    INSERT INTO documents (title, handler, modified) VALUES ('Document 3', 'John Smith', '2022-01-28 00:00:00');
  `;

  const targettimeframesSql = `
    CREATE TABLE IF NOT EXISTS targettimeframes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      target_id INT NOT NULL,
      goal VARCHAR(255) NOT NULL,
      planned_date DATE NOT NULL,
      actual_date DATE DEFAULT NULL,
      comments VARCHAR(255) DEFAULT NULL,
      document_id INT DEFAULT NULL,
      link_text VARCHAR(255) DEFAULT NULL
    );

    INSERT INTO targettimeframes (target_id, goal, planned_date, actual_date, comments, document_id, link_text) VALUES
      (1, 'Goal A', '2022-01-01', null, 'This is the first target timeframe', null, null),
      (2, 'Goal B', '2022-02-01', '2022-02-02', 'This is the second target timeframe', null, null),
      (3, 'Goal C', '2022-03-01', '2022-03-05', 'This is the third target timeframe', null, null),
      (4, 'Goal D', '2022-04-01', '2022-04-03', 'This is the fourth target timeframe', null, null),
      (5, 'Goal E', '2022-05-01', '2022-05-02', 'This is the fifth target timeframe', null, null),
      (6, 'Goal F', '2022-06-01', null, 'This is the sixth target timeframe', null, null),
      (7, 'Goal G', '2022-07-01', null, 'This is the seventh target timeframe', null, null),
      (8, 'Goal H', '2022-08-01', '2022-08-03', 'This is the eighth target timeframe', null, null),
      (9, 'Goal I', '2022-09-01', '2022-09-04', 'This is the ninth target timeframe', null, null),
      (10, 'Goal J', '2022-10-01', '2022-10-02', 'This is the tenth target timeframe', null, null),
      (2, 'Goal K', '2022-11-01', null, 'This is the eleventh target timeframe with target_id 2', null, null),
      (2, 'Goal L', '2022-12-01', null, 'This is the twelfth target timeframe with target_id 2', null, null);
`;

  connection.query(targettimeframesSql, (error, results) => {
    if (error) {
      console.error('Error initializing targettimeframes table:', error);
    } else {
      console.log('Targettimeframes table initialized');
    }
  });

  connection.query(draftsSql, (error, results) => {
    if (error) {
      console.error('Error initializing drafts table:', error);
    } else {
      console.log('Drafts table initialized');
    }
  });

  connection.query(plansSql, (error, results) => {
    if (error) {
      console.error('Error initializing plans table:', error);
    } else {
      console.log('Plans table initialized');
    }
  });

  connection.query(documentsSql, (error, results) => {
    if (error) {
      console.error('Error initializing documents table:', error);
    } else {
      console.log('Documents table initialized');
    }
  });
}

module.exports = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
};