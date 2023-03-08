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
      planned_date DATE NOT NULL,
      actual_date DATE,
      comments VARCHAR(255),
      document_id INT,
      FOREIGN KEY (document_id) REFERENCES documents(id)
    );

    INSERT INTO targettimeframes (target_id, planned_date, actual_date, comments, document_id) VALUES
    (1, '2023-02-21', '2023-02-23', '', 1),
    (2, '2023-01-01', '2023-03-31', 'Some comments here', 2),
    (3, '2023-02-01', '', 'Some comments here', 3),
    (4, '2023-01-15', '2023-12-31', 'Some comments here', 4),
    (5, '2023-03-01', '2024-01-31', 'Some comments here', 5);
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