// Dependencies
// =============================================================

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  //index route loads view.html

  app.post("/api/newExpense", function(req, res) {
    db.Expense.create(req.body).then(function(results){
      res.json(results);
    });
  });

};