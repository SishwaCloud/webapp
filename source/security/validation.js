const verifyEmail = require('email-validator');
const logger = require('../logger/logger');
console.log("Please here me - validation.js");
 function verifyCreateUsr(req, res, next) {
  logger.info("validate create user",req.body)
  if(!verifyEmail.validate(req.body['username']) ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("invalid email provided");
    res.send({"error":'invalid email provided'});
    return;
  }
  if(!req.body['password'] || req.body['password'].trim().length <= 5){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("invalid password provided");
    res.send({"error":'invalid password provided'});
    return;
  }
  if(!req.body['last_name'] || req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("invalid last_name provided");
    res.send({"error":'invalid last_name provided'});
    return;
  }
  if(!req.body['first_name'] || req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("invalid first_name provided");
    res.send({"error":'invalid first_name provided'});
    return;
  }
  return next();
}

 function verifyUpdateUsr(req, res, next) {
  logger.info("validate update user",req)
  console.log('inside validate')
  if(req.body['username'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("username can't be updated");
    res.send({"error":'username can\'t be updated'});
    return;
  }
  if(req.body['account_updated'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("updated time  can't be updated");
    res.send({"error":'updated time  can\'t be updated'});
    return;
  }
  if(req.body['account_created'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("created time can't be updated");
    res.send({"error":'created time can\'t be updated'});
    return;
  }
  if(req.body['password'] && req.body['password'].trim().length <= 5){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("invalid password provided");
    res.send({"error":'invalid password provided'});
    return;
  }
  if(req.body['last_name'] && req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("invalid last_name provided");
    res.send({"error":'invalid last_name provided'});
    return;
  }
  if(req.body['first_name'] && req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("invalid first_name provided");
    res.send({"error":'invalid first_name provided'});
    return;
  }
  return next();
}

function verifyUpdateProduct(req, res, next) {
  logger.info("validate update product",req)
  console.log('inside product validate')
  if(!req.body['name']){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("name can't be empty");
    res.send({"error":'name can\'t be empty'});
    return;
  }
  if(!req.body['description']){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("description can't be empty");
    res.send({"error":'description can\'t be empty'});
    return;
  }
  if(!req.body['sku']){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("sku can't be empty");
    res.send({"error":'sku can\'t be empty'});
    return;
  }
  if(!req.body['manufacturer']){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("manufacturer can't be empty");
    res.send({"error":'manufacturer can\'t be empty'});
    return;
  }
  if(req.body['quantity'] && !(Number.isInteger(req.body['quantity']) && req.body['quantity'] >= 0 && req.body['quantity'] <= 100)){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("Enter valid Quantity");
    res.send({"error":'Enter valid Quantity'});
    return;
  }
  if(req.body['date_added'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("created time  can't be updated");
    res.send({"error":'created time  can\'t be updated'});
    return;
  }
  if(req.body['date_last_updated'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("updated time can't be updated");
    res.send({"error":'updated time can\'t be updated'});
    return;
  }
  return next();
}

function verifyPatchProduct(req, res, next) {
  logger.info("validate patch product",req)
  console.log('inside product validate')
  if(req.body.hasOwnProperty('name') && req.body['name'].trim().length<=0){
    console.log('inside name'+req.body['name'].trim().length==0)
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("name can't be empty");
    res.send({"error":'name can\'t be empty'});
    return;
  }
  if(req.body.hasOwnProperty('description') && req.body['description'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("description can't be empty");
    res.send({"error":'description can\'t be empty'});
    return;
  }
  
  if(req.body.hasOwnProperty('sku') && req.body['sku'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("sku can't be empty");
    res.send({"error":'sku can\'t be empty'});
    return;
  }
  if(req.body.hasOwnProperty('manufacturer') && req.body['manufacturer'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("manufacturer can't be empty");
    res.send({"error":'manufacturer can\'t be empty'});
    return;
  }
  if(req.body['quantity'] && !(Number.isInteger(req.body['quantity']) && req.body['quantity'] >= 0 && req.body['quantity'] <= 100)){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("Enter valid Quantity");
    res.send({"error":'Enter valid Quantity'});
    return;
  }
  if(req.body['date_added'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("created time  can't be updated");
    res.send({"error":'created time  can\'t be updated'});
    return;
  }
  if(req.body['date_last_updated'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("updated time can't be updated");
    res.send({"error":'updated time can\'t be updated'});
    return;
  }
  return next();
}

module.exports={
  verifyCreateUsr,
  verifyUpdateUsr,
  verifyUpdateProduct,
  verifyPatchProduct
}