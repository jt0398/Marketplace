const Logger = require("./logger");
const logger = new Logger();
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello Word");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
}); //An EventEmitter

server.listen(3000);

console.log("Listening on port 3000");

//Add a listener before an event
logger.on("messageLogged", (args) => console.log("Listner called", args));

logger.log("message");

/*
const path = require("path");
const os = require("os");
const fs = require("fs");

var pathObj = path.parse(__filename);
console.log(pathObj);

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Total Memory: ${freeMemory}`);

fs.readdir("./", function (err, files) {
  if (err) return console.log("Error", err);

  console.log(files);
});*/
