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