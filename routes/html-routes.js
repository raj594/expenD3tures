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

	app.get("/members", function(req, res) {
		res.render("members")
	});

	app.get("/expense", function(req, res) {
		res.render("addExpense")
	});

	app.get("/login", function(req, res) {
		res.render("login")
	});

};
