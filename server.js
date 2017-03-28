//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");

//set up our port to be either the host's designed port, or 3000
var PORT = process.env.PORT ||3000;

//Instantiate out Express App
var app = express();

//set up an express router
var router = express.Router();

//require out routes file pass our router object
require("./config/routes")(router);

//design our public folder as a static directory
app.use(express.static(__dirname + "/public"));

//connect Habdlebars to our Express app
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use bodyParser in our app
app.use(bodyParser.urlencoded({
  extended: false
}));

//have every request go through our router middlewar
app.use(router);

//use local host for now
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});