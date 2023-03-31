const express = require('express');
const router = express.Router();
const authorization = require('../security/authorization.js')
const usrService = require('../service/service');
const {verifyCreateUsr,verifyUpdateUsr} = require('../security/validation');
const logger = require('../logger/logger');
const client = require('../logger/statsd');
console.log("Please here me - controller.js");
router.get('/:id',authorization,findUsr)
router.put('/:id',authorization,verifyUpdateUsr,updateUsr);
router.post('/',verifyCreateUsr,createNewUsr);

module.exports = router;

function findUsr(req,res,next){
  client.increment('GetUser', 1)
  logger.info("Find the User",req.body)
  usrService.findUsr({username:req.ctx.user.name})
  .then(data => res.json(data))
  .catch(next)
}

function updateUsr(req,res,next){
  client.increment('PUTUser', 1)
  logger.info("Update the User",req.body)
  usrService.updateUsr(req.body,req.ctx.user)
  .then(data => {res.status(204);res.json(data);
  })
  .catch(next)
  
}

function createNewUsr(req,res,next){
  client.increment('POSTUser', 1)
  logger.info("Create New User",req.body)
  usrService.createNewUsr(req.body,res)
  .then(data => {res.status(201);res.json(data)})
  .catch(data => {console.log(data);res.status(400).send("User already exists");next()});
}