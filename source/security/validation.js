const verifyEmail = require('email-validator');

 function verifyCreateUsr(req, res, next) {
  if(!verifyEmail.validate(req.body['username']) ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid email provided'});
    return;
  }
  if(!req.body['password'] || req.body['password'].trim().length <= 5){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid password provided'});
    res.send()
    return;
  }
  if(!req.body['last_name'] || req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    // res.send({"error":'invalid last_name provided'});
    res.send()
    return;
  }
  if(!req.body['first_name'] || req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
   
    res.send()
    return;
  }
  return next();
}

 function verifyUpdateUsr(req, res, next) {

  console.log('inside validate')
  if(req.body['username'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
   
    res.send()
    return;
  }
  if(req.body['account_updated'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send()
    return;
  }
  if(req.body['account_created'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send()
    return;
  }
  if(req.body['password'] && req.body['password'].trim().length <= 5){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send()
    return;
  }
  if(req.body['last_name'] && req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send()
    return;
  }
  if(req.body['first_name'] && req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    

    res.send()
    return;
  }
  return next();
}

module.exports={
  verifyCreateUsr,
  verifyUpdateUsr
}