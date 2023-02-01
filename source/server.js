const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
router.get('/healthz', (req, res) => {
    console.log('inside get request');
    res.send();
});
router.get('*', (req, res) => {
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
  res.send()
});
app.use('/v1/user', require('./controller/controller'));
app.use('/v1/', router);
module.exports = app;