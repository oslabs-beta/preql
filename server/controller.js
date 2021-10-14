const controller = {};
const { Pool } = require('pg');
const { DataFrame } = require('dataframe-js');


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

controller.getJoinTable = async (req, res, next) => {
    let PSQL_URI = req.body.link;
    let db = new Pool({ connectionString: PSQL_URI});
    //expect a body.tables (table 1 and 2 data) with tables populated
    //body.on (similar column names) and body.how ('left','right','outer', 'inner')
    // const TEST_QUERY = 'SELECT * FROM cv INNER JOIN jobs ON jobs.cv_id=cv._id';
    const tables = req.body.tables;
    const tableOne = req.body.tables[0];
    const tableTwo = req.body.tables[1];
    const joinHow = req.body.how;
    const on = req.body.on;
    const columns = req.body.columns;
    const tableNames = req.body.tableNames;
    const columnNames = [];
    let result;
    const qureynames = [];

    try{
        for (let i = 0; i < tableNames.length; i++){
            columnNames.push([])
            for (let name in tables[i][0]){
                columnNames[i].push(`${tableNames[i]}.${name}`)
                qureynames.push(`${tableNames[i]}.${name} as \"${tableNames[i]}.${name}\"`)
            }

        }

        const TEST_QUERY = `SELECT ${qureynames.join(', ')} FROM cv INNER JOIN jobs ON jobs.cv_id=cv._id`;
        console.log(TEST_QUERY);
        // columnNames[0].push('merge')
        result = await db.query(TEST_QUERY);
        console.log("QUERY ", result.rows)
        dfOne = new DataFrame(tableOne);
        dfOne = dfOne.renameAll(columnNames[0]);
        // console.log("TABLE1 ", columnNames[0], dfOne.toDict());

        dfTwo = new DataFrame(tableTwo);
        dfTwo = dfTwo.renameAll(columnNames[1]);
        
        // console.log(['cv.skill_ids', 'cv.full_name', 'cv.education', 'cv._id'], columnNames[0])
        // console.log(['cv.skill_ids', 'cv.full_name', 'cv.education', 'cv._id'] == columnNames[0])
        for (let i = 0; i < columnNames.length; i++){
            columnNames[i] = [...columnNames[i], 'merge'];
        }
        

        dfOne = dfOne.restructure(columnNames[0])
        dfTwo = dfTwo.restructure(columnNames[1])

        dfOne = dfOne.map(row => row.set('merge', row.get(`${on[0]}`)));
        dfTwo = dfTwo.map(row => row.set('merge', row.get(`${on[1]}`)));
        // console.log(`${on[0]}`)
        dfJoin = dfOne.join(dfTwo, 'merge', 'inner');
        dfJoin = dfJoin.drop('merge')
        console.log("Join ", dfJoin.toDict());
        // console.log("TABLE1 ", dfOne.toDict());
        // console.log("TABLE2 ", dfTwo.toDict());

        next();
    }
    catch (error) {
        next({
            log: "Error in TEST Table Data",
            status: 400,
            message: { err: "Error in TEST Table Data" },
          });
    }
}

//Get table names by URL

module.exports = controller;
