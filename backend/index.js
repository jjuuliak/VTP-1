const express = require('express');
const bodyParser = require('body-parser');
const plansApp = require('./plans');
const draftsApp = require('./drafts');
const setupDocumentsRoute = require('./documents');
const setupTargetTimeframesRoute = require('./targettimeframes');

const app = express();

// Add this middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());

app.use('/plans', plansApp);
app.use('/drafts', draftsApp);

setupDocumentsRoute(app); // Call the exported function from documents.js, passing in the app instance
setupTargetTimeframesRoute(app);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

module.exports = server;
