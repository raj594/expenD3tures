// Dependencies
// =============================================================

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  //index route loads view.html

	app.get("/api/expenses/:user", function(req, res) {
		db.Expense.findAll({ where: { user_name: req.params.user }
			//here is where we will add the information to search the expenses by
			//for instance, add a /api/expenses/:XXXXXX to the request and use req.params or add it into a form and use req.body.name
			//then also also add a "where: name=XXXXXX" in this spot.
		})
			.then(function(data){
		      var hbsObject = {
		        expense: data
		      };
		      // return to the ajax call a json object containing all of the expenses from the user entered in the form.
		      res.json(data)
		    });
	});

};