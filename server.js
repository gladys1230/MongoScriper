//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var handlebars = require("express-handlebars");

//require routes and use them
var routes = require("./routes/routes");

//initial express
var app = express();

//setup the handlebars view engine
// set up the HBS view engine
app.engine("hbs", handlebars({defaultLayout: "main", extnam: "hbs", partialsDir: [__dirname + "/views/partials"]}));
app.set("view engine", "hbs");

//use morgan for debug logging
app.use(logger("dev"));

//set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

//set the publicstatic directory
app.use(express.static("public"));

//import routes
app.use("/", routes);

//launch app
var port = process.env.PORT ||3000;

app.listen(port, function(){
	console.log("App is running on port:  " + port);
});
