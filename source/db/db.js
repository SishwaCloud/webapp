const CONFIGURATION = require('./dbConfiguration')
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
module.exports = db= {};
let isrun = false;
db.run = run;
run();''
async function run() {
  if(isrun){
    return;
  }
  console.log("inside running")
    // create db if it doesn't already exist
    const { HOST, SERVER_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, DATABASE } = CONFIGURATION;

    const connection = await mysql.createConnection({  host: HOST,
      user: MYSQL_USERNAME,
      password: MYSQL_PASSWORD});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DATABASE}\`;`);

    // connect to db
    const sequelize = new Sequelize(DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../model/model')(sequelize);
    console.log("after assigning")
    // sync all models with database
    await sequelize.sync();
    isrun = true;
    
}
