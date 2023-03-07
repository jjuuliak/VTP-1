// documents.js

function setupDocumentsRoute(app) {
    app.get('/api/documents', (req, res) => {
      const documents = [
        {
          "id": 1,
          "title": "Document 1",
          "handler": "Setä Manula",
          "modified": "2022-01-31"
        },
        {
          "id": 2,
          "title": "Document 2",
          "handler": "Jane Doe",
          "modified": "2022-01-29"
        },
        {
          "id": 3,
          "title": "Document 3",
          "handler": "John Smith",
          "modified": "2022-01-28"
        }
      ];
  
      res.json(documents);
    });
  }
  
  module.exports = setupDocumentsRoute;
  