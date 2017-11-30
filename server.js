var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("passport");
//var LocalStrategy = require("passport-local").Strategy
//var multer = require("multer");
var flash = require("express-flash-messages");
var d3 = require("d3");


var app = express();
var port = process.env.PORT || 3000;

//app.use(multer({dest:"./uploads"}));

app.use(express.static("public"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//exphbs.registerPartial("nav", {{"layout"}})


//for passport
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
})); //session secret
app.use(passport.initialize());
app.use(passport.session()) //persistant login sessions
app.use(flash());


//app.use(expressValidator)


// Controller model set up

// var userController = require("./controllers/userController.js");
// app.use("/", userController)
// app.use("/user", userController);




// Routes
// =============================================================
require("./routes/html-routes.js")(app);
var authRoute = require("./routes/user-api-routes.js")(app, passport);
//var authRoute = require("./routes/user-api-routes.js")(app);
require("./routes/expenses-api-routes.js")(app);
require("./routes/visualization-api-routes.js")(app);

//passport strategies




// Syncing our sequelize models and then starting our Express app
// =============================================================
var db = require("./models");
require("./config/passport/passport.js")(passport,db.User)


db.sequelize.sync().then(function() {
	app.listen(port, function() {
		console.log("Server started on port " + port)
	});
});


