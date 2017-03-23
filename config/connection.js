//require mongoose
var mongoose = require("mongoose");

//set mongoose to levarge built in JavaScript ES6
mongoose.Promise = Promise

mongoose.connect("mongodb://localhost/week18day3mongoose");

var db = mongoose.connection;

//show any mongoose errors
db.on("error", function(error){
	console.log("Mongoose Error: ", error);
});

//mongoose connection to db
db.once("open", function(){
	console.log("YOO! Mongoose connection successful!!!");
});

//export the database
module.exports = db;