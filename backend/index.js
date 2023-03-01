const express = require('express');
const bodyParser = require('body-parser');
const plansApp = require('./plans');
const draftsApp = require('./drafts');

const app = express();
app.use(bodyParser.json());

app.use('/plans', plansApp);
app.use('/drafts', draftsApp);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

module.exports = app;