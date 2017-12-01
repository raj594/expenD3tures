// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  //index route loads view.html
  	app.get("/", function(req, res) {
		res.render("index")
	})

	app.get("/register", function(req, res) {

		res.render("register")
	});


	app.get("/expense", function(req, res) {
		var username = req.user.username;
		res.render("addExpense", {username:  username});
	});

	app.get("/visualize", function(req, res) {
		var username = req.user.username;
		res.render("d3Visualization", {username:  username});
	});	

	

	//app.get("/login", function(req, res) {
	//	res.render("login")
	//});

};
