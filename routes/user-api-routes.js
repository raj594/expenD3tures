// Dependencies
// =============================================================

var db = require("../models");
var bcrypt = require("bcryptjs");
// Routes
// =============================================================
module.exports = function(app) {
  //index route loads view.html

	app.post("/api/newUser", function(req, res) {


		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.body.password, salt, function(err, hash) {
			 req.body.password = hash
			 console.log(hash)

				db.User.create(req.body).then(function(results){
					res.json(results);
				});
				
			});
		});
	});

};