const controller = {};
const { Pool } = require('pg');


controller.test = async (req, res, next) => {
    try{
        res.locals.test = "this works"
        next();
    }
    catch (error) {
        next({
            log: "Error in test",
            status: 400,
            message: { err: "Error in test" },
          });
    }
}

controller.getTableNames = async (req, res, next) => {
    let PSQL_URI = req.body.link;
    let db = new Pool({ connectionString: PSQL_URI});
    const GET_TABLE_QUERY = 'SELECT conrelid::regclass AS table_name\n'+
                            'FROM pg_constraint\n'+
                            'WHERE  contype = \'p\' AND connamespace = \'public\'::regnamespace';
    try{
        const results = await db.query(GET_TABLE_QUERY);
        res.locals.tables = [];
        for (let i = 0; i < results.rows.length; i++){
            res.locals.tables.push(results.rows[i]['table_name'])
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

    res.locals.tablesData = []
    let result;
    try{
        for (let i = 0; i < res.locals.tables.length; i++){
            result = await db.query('SELECT * FROM '+ res.locals.tables[i]);
            res.locals.tablesData.push(result.rows);
        }
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
