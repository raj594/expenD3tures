// Dependencies
// =============================================================

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  //index route loads view.html

	app.get("/api/expenses", function(req, res) {
		db.Expense.findAll({})
			.then(function(data){
		      var hbsObject = {
		        expense: data
		      };
		      res.render("d3Visualization", hbsObject);
		    });
	});

};