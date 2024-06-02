const { Sequelize } = require('sequelize');
const config = {
  development: {
    username: 'root',
    password: '', 
    database: 'your_database_name',
    host: 'localhost',
    dialect: 'mysql',
  },
};

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];

const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
  host: configEnv.host,
  dialect: configEnv.dialect,
});

module.exports = sequelize;
