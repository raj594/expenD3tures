// Dependencies
// =============================================================

var db = require("../models");
var d3 = require("d3");

// Routes
// =============================================================
module.exports = function(app) {
  //index route loads view.html

	app.get("/api/expenses/:user?", function(req, res) {
		console.log(req.body)
		if(req.params.user){
			var user = req.params.user;

				// this code finds all expenses from the expense table and sends the information back as a JSON object
				db.Expense.findAll({ 
					where: { user_name: user }
				})
				.then(function(data){
					res.json(data);
				});
		}
	});
};