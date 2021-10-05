const { Pool } = require('pg');
const { SourceMapDevToolPlugin } = require('webpack');

const PG_URI = '';


const pool = new Pool({
    connectionString: PG_URI
});

// SELECT  conrelid::regclass AS table_name,
// FROM pg_constraint  
// WHERE  contype = 'p' AND connamespace = 'public'::regnamespace

module.exports = {
    query: async (text, params, callback) => {
        console.log('executed query', text);
        return await pool.query(text, params, callback);
    }
};
            