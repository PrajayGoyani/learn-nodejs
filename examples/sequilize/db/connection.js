// database/connection.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'your-database-host',
  username: 'your-username',
  password: 'your-password',
  database: 'your-database',
});

module.exports = sequelize;

/*const Sequelize = require('sequelize');
const sequelize = require('./database/connection'); // Import your database connection

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
*/