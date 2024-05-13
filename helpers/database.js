const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'debian-sys-maint',
    database: 'first_app_db',
    password: 'NOUrJ0yXqwkrXl9I'
});

module.exports = pool.promise();