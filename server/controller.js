const controller = {};
const { Pool } = require('pg');


controller.getTableNames = async (req, res, next) => {
    let PSQL_URI = req.body.link;
    let db = new Pool({ connectionString: PSQL_URI});
    const GET_TABLE_QUERY = 'SELECT conrelid::regclass AS table_name\n'+
                            'FROM pg_constraint\n'+
                            'WHERE  contype = \'p\' AND connamespace = \'public\'::regnamespace';
    try{
        const results = await db.query(GET_TABLE_QUERY);
        res.locals.tableNames = [];
        for (let i = 0; i < results.rows.length; i++){
            res.locals.tableNames.push(results.rows[i]['table_name'])
        }
        next();
    }
    catch (error) {
        next({
            log: "Error in Get Table Names",
            status: 400,
            message: { err: "Error in Get Table Names" },
          });
    }
}


controller.getTableData = async (req, res, next) => {
    let PSQL_URI = req.body.link;
    let db = new Pool({ connectionString: PSQL_URI});

    res.locals.tableData = []
    let result;
    try{
        for (let i = 0; i < res.locals.tableNames.length; i++){
            result = await db.query('SELECT * FROM '+ res.locals.tableNames[i]);
            res.locals.tableData.push(result.rows);
        }
        res.locals.returnData = {'tableNames':res.locals.tableNames, 'tableData':res.locals.tableData}
        next();
    }
    catch (error) {
        next({
            log: "Error in Get Table Data",
            status: 400,
            message: { err: "Error in Get Table Data" },
          });
    }
}


//Get table names by URL

module.exports = controller;
