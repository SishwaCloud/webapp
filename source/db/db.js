const CONFIGURATION = require('./dbConfiguration')
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const logger = require('../logger/logger');
console.log("Please here me - db.js");
module.exports = db= {};
let isrun = false;
db.run = run;
run();''
async function run() {
  if(isrun){
    return;
  }
    logger.info('Connecting to database...');
    // create db if it doesn't already exist
    const { DB_PORT,HOST, SERVER_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, DATABASE } = CONFIGURATION;

    const connection = await mysql.createConnection({  host: HOST,
      user: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      port:DB_PORT});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`);

    // connect to db
    const sequelize = new Sequelize(DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, { host: CONFIGURATION.HOST, dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../model/model')(sequelize);
    db.Product = require('../model/productModel')(sequelize);
    db.Image = require('../model/imageModel')(sequelize);
    logger.info('Database connected');
    // sync all models with database
    await sequelize.sync();
    isrun = true;
    
}
