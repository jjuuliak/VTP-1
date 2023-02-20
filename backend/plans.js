const plans = [
    { id: 1, name: 'Plan 1', description: 'This is the first plan.' },
    { id: 2, name: 'Plan 2', description: 'This is the second plan.' },
    { id: 3, name: 'Plan 3', description: 'This is the third plan.' }
];

let nextId = 4;

function configureRoutes(app) {
    app.get('/plans', (req, res) => {
        res.send(plans);
    });

    app.get('/plans/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const plan = plans.find(p => p.id === id);
        if (!plan) {
            return res.status(404).send('Plan not found');
        }
        res.send(plan);
    });

    app.post('/plans', (req, res) => {
        const plan = req.body;
        plan.id = nextId++;
        plans.push(plan);
        res.send(plan);
    });

    app.put('/plans/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const planIndex = plans.findIndex(p => p.id === id);
        if (planIndex === -1) {
            return res.status(404).send('Plan not found');
        }
        const plan = req.body;
        plan.id = id;
        plans[planIndex] = plan;
        res.send(plan);
    });
}

module.exports = configureRoutes;