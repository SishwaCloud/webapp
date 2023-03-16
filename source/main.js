const server = require("./server.js");

const CONFIGURATION = require('./db/dbConfiguration');
console.log("Please here me - main.js");
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send({'error':'Bad request'});
  })
  server.listen(CONFIGURATION.SERVER_PORT,()=>{
    console.log("server started at port: ",CONFIGURATION.SERVER_PORT);
  });

process.on('uncaughtException', function(ex) {
  console.log("server crash triggered");
  console.log(ex);
});
