// const uniqueId = require('uuid');
const bcrypt = require('bcryptjs');
const mySqlDb = require('../db/db');
console.log("Please here me - service.js");
async function  createNewUsr(user) {
  await mySqlDb.run();
  const userInfo = await mySqlDb.User.findOne({ where: { username: user.username } })
  if (userInfo) {
    throw user.username + " user already exists";
    return;
  }
  if (user.password) {
    user.hash = await bcrypt.hash(user.password, 10);
  }
  // user.id = uniqueId.v4();
  let formattedDateString = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  user.account_created = formattedDateString;
  user.account_updated = formattedDateString;
  user.password = user.hash;
  await mySqlDb.User.create(user);
  const usrDet = await mySqlDb.User.findOne({ where: { username: user.username } })
  let {id,username,first_name,last_name,account_created,account_updated}=usrDet;
  return {id,username,first_name,last_name,account_created,account_updated};
}

async function updateUsr(data,user){
  console.log('inside update user')
  let userInfo = await mySqlDb.User.findOne({ where: { username: user.name } })
  if (!userInfo) {
    throw user.username + " doesn't exists";
    return;
  }
  userInfo = userInfo.dataValues
  if (data.password) {
    userInfo.password = await bcrypt.hash(data.password, 10);
  }
  if(data.account_created){
    delete user.account_created;
  }

  if(data.account_updated){
    delete user.account_updated;
  }
  if(data.first_name){
    userInfo.first_name = data.first_name
  }
  if(data.last_name){
    userInfo.last_name = data.last_name
  }
  let formattedDateString = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  userInfo.account_updated = formattedDateString
  mySqlDb.User.update({password:userInfo.password,
                  first_name:userInfo.first_name,
                  last_name:userInfo.last_name,
                  account_updated:userInfo.account_updated
                  },{where:{username:user.name}})              

}

async function findUsr({username}){
  const data = await mySqlDb.User.findOne({ where: { username: username } });
  const {id,first_name,last_name,account_created,account_updated} = data.dataValues;
  console.log({id,username,first_name,last_name,account_created,account_updated});
  return {id,username,first_name,last_name,account_created,account_updated}

}

async function getUserWithHash({username}){
  return await mySqlDb.User.findOne({ where: { username: username } });
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}
module.exports = {
  findUsr,
  getUserWithHash,
  updateUsr,
  createNewUsr
}