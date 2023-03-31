const bcrypt = require('bcryptjs');
const db = require('../db/db'); 
const sss = require('../s3');
const logger = require('../logger/logger');
module.exports = {
    createNewProduct,
    updateProductValues,
    getProductById,
    patch,
    deleteProduct,
    getProduct
}
async function  createNewProduct(params, req, res) {
     console.log("Please here me prod service");
     logger.info("Create New Product",req)
    if (await db.Product.findOne({ where: { sku: params.sku } })) {
        throw 'SKU "' + params.sku + '" already exists, please enter a different SKU';
    }

const userId = req.ctx.user.id;
let date_ob = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
params.date_added = date_ob;
params.date_last_updated = date_ob;
params.owner_user_id = userId;

if (!(Number.isInteger(params.quantity) && params.quantity >= 0 && params.quantity <= 100)){
   throw 'Enter a valid quantity';
}

//creating a record in the database using the create library (sequalize)
const product = await db.Product.create(params);
let {id,name,description,sku,manufacturer,quantity,date_added,date_last_updated,owner_user_id} = product.get();
return {id,name,description,sku,manufacturer,quantity,date_added,date_last_updated,owner_user_id} ;

}

async function updateProductValues(req,res){
    const updateProduct = req.body;
    const product = await getProduct(req.params.pid);
     logger.info("update the Product Values: ",product)
    let date_ob = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    updateProduct.date_last_updated = date_ob
     const userId = req.ctx.user.id;
    if(userId != product.dataValues.owner_user_id){
        res.sendStatus(403);
        logger.error("You are forbidden to update this product");
        throw 'You are forbidden to update this product';
    }

    if (!(Number.isInteger(updateProduct.quantity) && updateProduct.quantity >= 0 && updateProduct.quantity <= 100)){
        logger.error("Enter a valid quantity");
        throw 'Enter a valid quantity';
    }
    
    const new_data = await db.Product.findOne({ where: { id: req.params.pid } });

    if(new_data.dataValues.sku != updateProduct.sku){
    if (await db.Product.findOne({ where: { sku: updateProduct.sku } })) {
        logger.error("SKU already exists, please enter a different SKU");
        throw 'SKU "' + updateProduct.sku + '" already exists, please enter a different SKU';
    }
    }

    Object.assign(product, updateProduct);
    //saving the user object to the db
    await product.save();
    //To omit password in the response 
    return (product.get());
}



async function getProductById(pid) {
   const product = await getProduct(pid);
   logger.info("Get the Product by Id: ",product)
   if(!product){ 
    logger.error("Product is not present in the database");
    throw 'Product is not present in the database';
   }
    let {id,name,description,sku,manufacturer,quantity,date_added,date_last_updated,owner_user_id} = product;
    return {id,name,description,sku,manufacturer,quantity,date_added,date_last_updated,owner_user_id} ;
    
}



async function patch(productId, params, req, res) {
    //we get this user object from the db
    const product = await getProduct(productId);
    console.log(product+" kajshdk");
    logger.info("Patch the Product: ",product)
    let date_ob = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
     params.date_last_updated = date_ob
     const userId = req.ctx.user.id;
    if(userId != product.dataValues.owner_user_id){
        res.sendStatus(403); 
        logger.error("You are forbidden to update this product");                              
        throw 'You are forbidden to update this product';
    }
    if (req.body.hasOwnProperty('quantity')){
    if (!(Number.isInteger(params.quantity) && params.quantity >= 0 && params.quantity <= 100)){
        res.status(400).send("Enter a valid quantity");
        logger.error("Enter a valid quantity");
        throw 'Enter a valid quantity';
    }
}

    if (req.body.hasOwnProperty('sku')){
    const new_data = await db.Product.findOne({ where: { id: req.params.pid } });
    // console.log(new_data.dataValues.sku);
    if(new_data.dataValues.sku != params.sku){
    if (await db.Product.findOne({ where: { sku: params.sku } })) {
        logger.error("SKU already exists, please enter a different SKU");
        throw 'SKU "' + params.sku + '" already exists, please enter a different SKU';
    }
}
}
    Object.assign(product, params);
    //saving the user object to the db
    await product.save();
    //To omit password in the response 
    return (product.get());
}


async function deleteProduct(productId, req) {
    const product = await db.Product.findByPk(productId);
    logger.info("Deleting the Product: ",product)
    if (!product) throw 'Product is not present in the database';

    const userId = req.ctx.user.id;
    if(userId != product.dataValues.owner_user_id){
        logger.error("You cannot delete this product");
        throw 'You cannot delete this product!'
    } else {
    db.Product.destroy({ where: { id: productId } })

   const getAllImages = await db.Image.findAll({
        attributes: ['image_id', 'product_id', 'file_name', 'date_created', 's3_bucket_path'],
        where: {
            product_id: productId
        }
    });

    console.log(getAllImages);
    if( getAllImages.length > 0){
    for (let i = 0; i < getAllImages.length; i++) {
        const image = getAllImages[i];
        const Key = image.s3_bucket_path;
        console.log(Key);
        await sss.deleteFile(Key);
    }

    db.Image.destroy({ where: { product_id: productId } });
    }
}
    return product;
}


async function getProduct(productId) {
    const product = await db.Product.findByPk(productId);   
    logger.info("Fetched the Product from the Database :",product)
    if (!product) throw 'Product is not present in the database';
    return product;
   }