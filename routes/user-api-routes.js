// Dependencies
// =============================================================

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  //index route loads view.html

	app.post("/api/new", function(req, res) {
		db.User.create(req.body).then(function(results){
			res.json(results);
		});
	});

};