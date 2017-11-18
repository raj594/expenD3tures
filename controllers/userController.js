var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {
	res.render("index")
})

router.get("/register", function(req, res) {
	res.render("register")
});

router.get("/login", function(req, res) {
	res.render("login")
});

router.post("/login", function(req, res) {
	console.log(req.body.name)
});




module.exports = router;