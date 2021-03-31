const log = require("./logger");
const path = require("path");
const os = require("os");
const fs = require("fs");
const EventEmitter = require("events");
const emitter = new EventEmitter();

//Raise an event
emitter.emit("messageLogged");

log("message");

var pathObj = path.parse(__filename);
console.log(pathObj);

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Total Memory: ${freeMemory}`);

fs.readdir("./", function (err, files) {
  if (err) return console.log("Error", err);

  console.log(files);
});
