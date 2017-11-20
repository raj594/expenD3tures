// Dependencies
// =============================================================

var db = require("../models");
var bcrypt = require("bcryptjs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy
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

	
	app.post('/api/login',
  		
  		passport.authenticate('local', {failureRedirect:"/login", failureFlash:"Invalid login"}),
  		
  		function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    	//res.redirect('/users/' + req.user.username);
    	req.flash("success", "you are now logged in");
    	res.redirect("/")
  	});

	passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

	passport.use(new LocalStrategy(function(username, password, done) {
		User.getUserByUsername(username, function(err, user){
			if(err) throw err;
			if(!user) {
				return done(null, false, {message:"Unknown user"})
			}
			user.comparePassword(password, user.password, function(err, isMatch){
				if(err) return done(err);
				if(isMatch){
					return done(null, user);
				} else {
					return done(null, false, {message:"invalid password"})
				}
			})
		})
	}))

};