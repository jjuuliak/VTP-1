const drafts = [
    { id: 1, title: 'Draft 1', body: 'This is the first draft.' },
    { id: 2, title: 'Draft 2', body: 'This is the second draft.' },
    { id: 3, title: 'Draft 3', body: 'This is the third draft.' }
];

let nextId = 4;

function configureRoutes(app) {
    app.get('/drafts', (req, res) => {
        res.send(drafts);
    });

    app.get('/drafts/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const draft = drafts.find(d => d.id === id);
        if (!draft) {
            return res.status(404).send('Draft not found');
        }
        res.send(draft);
    });

    app.post('/drafts', (req, res) => {
        const draft = req.body;
        draft.id = nextId++;
        drafts.push(draft);
        res.send(draft);
    });

    app.put('/drafts/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const draftIndex = drafts.findIndex(d => d.id === id);
        if (draftIndex === -1) {
            return res.status(404).send('Draft not found');
        }
        const draft = req.body;
        draft.id = id;
        drafts[draftIndex] = draft;
        res.send(draft);
    });
}

module.exports = configureRoutes;