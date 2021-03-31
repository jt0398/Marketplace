var url = "http://mylogger.io/log";

function log(message) {
  console.log(message);
}

console.log(__filename);
console.log(__dirname);

//module.exports.log = log; Export an object when exposing multiple object
module.exports = log; //Single function
