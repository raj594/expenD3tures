var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy
var multer = require("multer");
var flash = require("connect-flash");

var userController = require("./controllers/userController.js");

var app = express();
var PORT = 3000;

var db = require("./models");

//app.use(multer({dest:"./uploads"}));

app.use(express.static("public"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

//app.get("/", function(req, res) {
//	res.render("index")
//});
app.use("/", userController)
app.use("/user", userController);

//app.use(expressValidator)


db.sequelize.sync({ force:true }).then(function() {
	app.listen(PORT, function() {
		console.log("Server started on port " + PORT)
	});
});