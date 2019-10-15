// path package dependency for easy delivery with express 
var path = require("path");

// Build routes
module.exports = function (app) {
    //survey - get
    app.get("/survey", function(req, res) {
		  res.sendFile(path.join(__dirname, "/../public/survey.html"))
    
    })
    //home - use
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });


}