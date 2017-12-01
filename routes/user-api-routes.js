// Dependencies
// =============================================================

var db = require("../models");
var authController = require("../controllers/userController.js")
// Routes
// =============================================================
module.exports = function(app, passport) {
  //index route loads view.html



	app.get("/register", authController.register)

	app.get("/login", authController.login)


	app.post("/register", passport.authenticate("local-signup", 
	{
		successRedirect: "/home",

		failureRedirect: "/login"
	}
	))

	app.get("/home",isLoggedIn, authController.home)

	app.get("/logout", authController.logout)


	app.post("/login", passport.authenticate("local-signin", 
	{
		successRedirect: "/home",
		failureRedirect: "/login",
		failureFlash: true
	}	
	))

//});
	

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next()
		res.redirect("/login")
	}
}