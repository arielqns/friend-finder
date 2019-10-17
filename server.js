// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();


var bodyParser = require('body-parser');

// var path = require("path");

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;


// create appplication/x-www-form-urlcoded parser

// Create app urlencoded parser
app.use(bodyParser.urlencoded({ extended: true}));

// parse various different custom JSON types as Json
app.use(bodyParser.json({ type: 'application/*+json'}))

// parse some custome things into a buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type'}))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html'}))


require("./app/routing/api-routes.js")(app);
require("./app/routing/html-routes.js")(app);

app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});
