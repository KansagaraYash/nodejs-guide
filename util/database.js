// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'debian-sys-maint',
//     database: 'first_app_db',
//     password: 'NOUrJ0yXqwkrXl9I'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('first_app_db', 'debian-sys-maint', 'NOUrJ0yXqwkrXl9I', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
