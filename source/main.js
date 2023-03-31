const server = require("./server.js");

const CONFIGURATION = require('./db/dbConfiguration');
const logger = require('./logger/logger');
logger.info("Please here me - main.js");
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send({'error':'Bad request'});
  })
  server.listen(CONFIGURATION.SERVER_PORT,()=>{
    logger.info("server started at port: ",CONFIGURATION.SERVER_PORT);
  });

process.on('uncaughtException', function(ex) {
  logger.info("server crash triggered");
  logger.info(ex);
});
