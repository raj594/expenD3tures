// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  //index route loads view.html

	app.get("/api/expenses/:user", function(req, res) {

		    		// // this code finds all expenses from the expense table and renders the d3 page with them as a handlebars object
		db.Expense.findAll({ where: { user_name: req.params.user }})
			.then(function(data){
		      var hbsObject = {
		        expense: data
		      };
			res.render("d3Visualization", hbsObject);
		    });

	});
};