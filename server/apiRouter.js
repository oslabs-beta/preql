const express = require('express');
const controller = require('./controller');
const apiRouter = express.Router();

//Connection Route
apiRouter.post('/connect', 
    controller.getTableNames,
    controller.getTableData,
    (req, res) => {
        res.status(200).send(res.locals.returnData);
});

module.exports = apiRouter;