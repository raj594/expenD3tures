var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy
var multer = require("multer");
var flash = require("connect-flash");


var app = express();
var PORT = 3000;

//app.use(multer({dest:"./uploads"}));

app.use(express.static("public"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//exphbs.registerPartial("nav", {{"layout"}})


app.use(session({
	secret: "secret",
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize())
app.use(passport.session())

//app.use(expressValidator)


// Controller model set up

// var userController = require("./controllers/userController.js");
// app.use("/", userController)
// app.use("/user", userController);




// would be used without sequelize
// var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "userauth"
// });



// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/expenses-api-routes.js")(app);




// Syncing our sequelize models and then starting our Express app
// =============================================================
var db = require("./models");

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("Server started on port " + PORT)
	});
});


