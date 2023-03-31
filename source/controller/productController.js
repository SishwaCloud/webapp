const express = require('express');
const router = express.Router();
const authorization = require('../security/authorization.js');
const product_Service = require('../service/productService.js');
const {verifyUpdateProduct,verifyPatchProduct} = require('../security/validation');
const logger = require('../logger/logger');
const client = require('../logger/statsd');
console.log("Please here me prod controller")
router.post('/',authorization,verifyUpdateProduct,createNewProduct);
router.put('/:pid',authorization,verifyUpdateProduct,updateProductValues);
router.get('/:pid', getProductById);
router.patch('/:pid', authorization,verifyPatchProduct, patch);
router.delete('/:pid', authorization, deleteProduct);

function createNewProduct(req,res,next){
  client.increment('POSTProduct', 1)
    logger.info("Create New Product",req.body)
    product_Service.createNewProduct(req.body,req,res)
  .then(data => {res.status(201);res.json(data)})
  .catch(data => {console.log(data);res.sendStatus(400);next()});
}

function updateProductValues(req,res,next){
  client.increment('PUTProduct', 1)
    logger.info("Update the Product",req.body)
    product_Service.updateProductValues(req,res)
  .then(data => {res.status(204);res.json(data)})
  .catch(data => {console.log(data);res.sendStatus(400);next()});
}

function getProductById(req, res, next) {
  client.increment('GETProduct', 1)
    logger.info("Get the Product details by ID",req.body)
    product_Service.getProductById(req.params.pid)
        .then(product => res.json(product))
        .catch(product=> {res.status(404).send("Product is not present in the database");next()});
}

function patch(req, res, next) {
  client.increment('PATCHProduct', 1)
    logger.info("Patch the Product",req.body)
    product_Service.patch(req.params.pid, req.body,req,res)
        .then(product => res.status(204).json(product))
        .catch(data => {console.log(data);res.status(400).send("SKU already exists");next()});
      
}

function deleteProduct(req, res, next) {
  client.increment('DELETEProduct', 1)
    logger.info("Delete the Product",req.body)
    product_Service.deleteProduct(req.params.pid, req, req.body)
        .then(product => res.status(204).json(product))
        .catch(next);
}

module.exports = router;
