const usrService = require('../service/service');
const mySqlDb = require('../db/db');
const basicAuthentication = require('basic-auth');
const bcrypt = require('bcryptjs');
const logger = require('../logger/logger');
module.exports = authorization;
console.log("Please here me - authorization.js");
async function authorization (req,res,next){
  const authData = basicAuthentication(req);
  if (!authData || !authData.name || !authData.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  logger.info("Authorization",authData)
  const existingUsr = await mySqlDb.User.findOne({where:{username:authData.name}})
  if(!existingUsr){
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    logger.info("User not found")
    console.log("user not found")
    res.status(401).send("Invalid username or password")
    return
  }
  


  if(req.params.pid && req.params.image_id){
    const onlyImage = await mySqlDb.Image.findOne({where:{image_id:req.params.image_id}})

    const ProductImage = await mySqlDb.Image.findOne({
      where: {
          image_id: req.params.image_id,
          product_id: req.params.pid
      }
  });

  if(onlyImage){
    if (!ProductImage) {
       logger.info("Forbidden")
        return res.status(403).send("Forbidden");
      
    }
}else{
  logger.info("Image not Found")
    return res.status(404).send("Image not Found");
}
  }




  if(req.params.pid){
    const existingProduct = await mySqlDb.Product.findOne({where:{id:req.params.pid}})
    if(!existingProduct){
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      console.log("product not found")
      res.status(404).send("Product not found")
      return
    }
    if (req.params.pid && existingUsr.id != existingProduct.owner_user_id ) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(403);
      return
    }
  }
  if (req.params.id && existingUsr.id !=req.params.id ) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(403);
    return
  }


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
  req.ctx.user.id = existingUsr.id;
  next()
}
