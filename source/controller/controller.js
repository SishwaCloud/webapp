const express = require('express');
const router = express.Router();
const authorization = require('../security/authorization.js')
const usrService = require('../service/service');
const {verifyCreateUsr,verifyUpdateUsr} = require('../security/validation');

router.get('/self',authorization,findUsr)
router.put('/self',authorization,verifyUpdateUsr,updateUsr);
router.post('/',verifyCreateUsr,createNewUsr);
module.exports = router;

function findUsr(req,res,next){
  usrService.findUsr({username:req.ctx.user.name})
  .then(data => res.json(data))
  .catch(next)
}

function updateUsr(req,res,next){
  usrService.updateUsr(req.body,req.ctx.user)
  .then(data => {res.status(204);res.json(data);
  })
  .catch(next)
  
}

function createNewUsr(req,res,next){
  usrService.createNewUsr(req.body)
  .then(data => {res.status(201);res.json(data)})
  .catch(data => {console.log(data);res.sendStatus(400);next()});
}