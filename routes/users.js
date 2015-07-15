var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
		url: '',
		bindDn: '',
		bindCredentials: '',
		searchBase: '',
		searchFilter: '(uid={{username}})'
	}
};

//passport.use(new LdapStrategy(OPTS));
passport.use(new LdapStrategy(OPTS));

// router.post('/login', passport.authenticate('ldapauth', {session: false}), 
// 	function(req, res) {
// 		console.log('Authentication Successful');
// 		req.flash('success', 'You are logged in');
// 		res.redirect('/');

// 	});

// passport.use(new LdapStrategy({
//     server: {
//         url: 'ldap://ldap-99.soe.ucsc.edu',
//         bindDN: 'cn=root',
//         bindCredentials: 'secret',
//         searchBase: 'ou=People,dc=ucsc,dc=edu',
//         searchFilter: '(uid={{username}})'
//     }
// }));

// router.post('/login', passport.authenticate('ldapauth', {
//     failureRedirect: '/users/login', 
//     failureFlash: 'invalid username or password'}), function(req, res) {
//         console.log('Authentication Successful');
//         req.flash('success', 'You are logged in');
//         res.redirect('/');
// });

module.exports = router;
