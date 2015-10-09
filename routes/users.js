var express = require('express');
var router = express.Router();

var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var LdapStrategy = require('passport-ldapauth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* users/register */
router.get('/register', function(req, res, next) {
  res.render('register', {
  	'title': 'Register'
  });
});


/* users/login */
router.get('/login', function(req, res, next) {
  res.render('login', {
  	'title': 'Login'
  });
});

var OPTS = {
	server: {
		url: 'ldaps://ldap-99.soe.ucsc.edu',
		bindDn: 'ou=People,dc=crm,dc=ucsc,dc=edu',
		bindCredentials: '{{password}}',
		searchBase: 'ou=People,dc=crm,dc=ucsc,dc=edu',
		searchFilter: '(uid={{username}})'
	}
};


//passport.use(new LdapStrategy(OPTS));
passport.use(new LdapStrategy(OPTS));


// from http://code.runnable.com/VOd1LNZyrqxYnQES/nodejs-passport-ldapauth-express-test-for-node-js-and-hello-world
router.post('/login', function(req, res, next) {
  passport.authenticate('ldapauth', {session: false}, function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    return res.send({ success : true, message : 'authentication succeeded' });
  })(req, res, next);
});



// router.post('/login', passport.authenticate('ldapauth',
// 	{session: false}), 
// 	function(req, res) {
// 		console.log('Authentication Successful');
// 		req.flash('success', 'You are logged in');
// 		res.redirect('/');

// 	});



// router.post('/login', passport.authenticate('ldapauth', {
//     failureRedirect: '/users/login', 
//     failureFlash: 'invalid username or password'}),
// 	function(req, res) {
//         console.log('Authentication Successful');
//         req.flash('success', 'You are logged in');
//         res.redirect('/');
// });

module.exports = router;
