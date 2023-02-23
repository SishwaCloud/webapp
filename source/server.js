const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
console.log("Please here me - server.js");
router.get('/healthz', (req, res) => {
    console.log('inside get request');
    res.send({"error":'url not defined'});
});
router.get('*', (req, res) => {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'url not defined'});
});
router.put('*', (req, res) => {
  res.status(400);
  res.setHeader('Content-Type', 'application/json');
   res.send({"error":'url not defined'});
});
router.post('*', (req, res) => {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
     res.send({"error":'url not defined'});
});
router.delete('*', (req, res) => { res.status(400);
  res.setHeader('Content-Type', 'application/json');
   res.send({"error":'url not defined'});
});
router.patch('*', (req, res) => { res.status(400);
  res.setHeader('Content-Type', 'application/json');
   res.send({"error":'url not defined'});
});
app.use('/v1/user', require('./controller/controller'));
app.use('/v1/product', require('./controller/productController'));
app.use('/', router);
module.exports = app;