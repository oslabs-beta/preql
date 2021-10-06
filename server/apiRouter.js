const express = require('express');
const controller = require('./controller');
const apiRouter = express.Router();

apiRouter.get('/test', 
    controller.test,
    (req, res) => {
        res.status(200).send(res.locals.test);
});

//Connection Route
apiRouter.post('/connect', 
    controller.getTableNames,
    controller.getTableData,
    (req, res) => {
        res.status(200).send(res.locals.tablesData);
});

module.exports = apiRouter;