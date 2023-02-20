const express = require('express');
const bodyParser = require('body-parser');
const configureDraftsRoutes = require('./drafts');
const configurePlansRoutes = require('./plans');

const app = express();
app.use(bodyParser.json());

configureDraftsRoutes(app);
configurePlansRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});