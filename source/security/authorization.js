const usrService = require('../service/service');
const mySqlDb = require('../db/db');
const basicAuthentication = require('basic-auth');
const bcrypt = require('bcryptjs');
module.exports = authorization;

async function authorization (req,res,next){
  const authData = basicAuthentication(req);
  if (!authData || !authData.name || !authData.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  console.log(authData)
  const existingUsr = await mySqlDb.User.findOne({where:{username:authData.name}})
  console.log(existingUsr)
  console.log(existingUsr.password)
  console.log(authData.pass)
  if (!(await bcrypt.compare(authData.pass, existingUsr.password)))
  {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return
  }
  console.log("authentication existingUsr details")
  console.log(existingUsr) 
  req.ctx={};
  req.ctx.user = authData;
  next()
}