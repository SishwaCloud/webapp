const express = require('express');
const app = express();
app.use(express.json());
const client = require('./logger/statsd');
const router = express.Router();
const logger = require('./logger/logger');
console.log("Please here me - server.js");
logger.info("Please here me - server.js");
router.get('/healthz', (req, res) => {
  client.increment('Gethealthz', 1)
    console.log('inside get request');
    logger.info('inside get request');
    res.send({"status":'ok'});
});
router.get('*', (req, res) => {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("url not defined");
    res.send({"error":'url not defined'});
});
router.put('*', (req, res) => {
  res.status(400);
  res.setHeader('Content-Type', 'application/json');
  logger.error("url not defined");
   res.send({"error":'url not defined'});
});
router.post('*', (req, res) => {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    logger.error("url not defined");
     res.send({"error":'url not defined'});
});
router.delete('*', (req, res) => { res.status(400);
  res.setHeader('Content-Type', 'application/json');
  logger.error("url not defined");
   res.send({"error":'url not defined'});
});
router.patch('*', (req, res) => { res.status(400);
  res.setHeader('Content-Type', 'application/json');
  logger.error("url not defined");
   res.send({"error":'url not defined'});
});
app.use('/v2/user', require('./controller/controller'));
app.use('/v2/product', require('./controller/productController'));
app.use('/v2', require('./controller/imageController'));
app.use('/', router);
module.exports = app;
