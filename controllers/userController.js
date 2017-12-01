
var exports = module.exports = {}

exports.register = function(req, res) {
	res.render("register")
}

exports.login = function(req, res) {
	var flashMessages = res.locals.getMessages();
	if (flashMessages.error) {
		res.render("login", {
			showErrors: true,
			errors: flashMessages.error
		})
		
	} else {
		res.render("login")
	}
	
	
}

exports.home = function(req, res) {
	res.render("home")
}

exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('/')
	})
}

//var express = require("express");
//
//var router = express.Router();
//
//router.get("/", function(req, res) {
//	res.render("index")
//})
//
//router.get("/register", function(req, res) {
//	res.render("register")
//});
//
//router.get("/members", function(req, res) {
//	res.render("members")
//});
//
//router.get("/login", function(req, res) {
//	res.render("login")
//});
//
//router.post("/login", function(req, res) {
//	console.log(req.body.name)
//});
//
//

//
//module.exports = router;