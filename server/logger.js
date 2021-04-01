const EventEmitter = require("events");

var url = "http://mylogger.io/log";

class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    //Raise an event called messageLogged
    //Calls all registered listner synchronously
    //Pass event arguments
    this.emit("messageLogged", { id: 1, url: "https://" });
  }
}

//console.log(__filename);
//console.log(__dirname);
//module.exports.log = log; Export an object when exposing multiple object
module.exports = Logger; //Single function
