var express = require('express');
var router = express.Router();

var fs = require('fs');

var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
//var LdapStrategy = require('passport-ldapauth');

// try using ldapauth-fork instructions
var connect = require('connect');
var LdapAuth = require('ldapauth-fork');


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

// Config from a .json or .ini file or whatever.
var config = {
  ldap: {
    url: "ldaps://ldap-99.soe.ucsc.edu:636",
    bindDn: 'ou=People,dc=crm,dc=ucsc,dc=edu',
    bindCredentials: "password",
    searchBase: "ou=users,o=example.com",
    searchFilter: "(uid={{username}})"
  }
};

var ldap = new LdapAuth({
  url: config.ldap.url,
  bindDn: config.ldap.bindDn,
  bindCredentials: config.ldap.bindCredentials,
  searchBase: config.ldap.searchBase,
  searchFilter: config.ldap.searchFilter,
  //log4js: require('log4js'),
  cache: true
});

var basicAuthMiddleware = connect.basicAuth(function (username, password, callback) {
  ldap.authenticate(username, password, function (err, user) {
    if (err) {
      console.log("LDAP auth error: %s", err);
    }
    callback(err, user)
  });
});


// var OPTS = {
// 	server: {
// 		url: 'ldap://ldap-99.soe.ucsc.edu',
// 		bindDn: 'ou=People,dc=crm,dc=ucsc,dc=edu',
// 		bindCredentials: '{{password}}',
// 		searchBase: 'ou=People,dc=crm,dc=ucsc,dc=edu',
// 		searchFilter: '(uid={{username}})'
// 	}
// };



//passport.use(new LdapStrategy(OPTS));
//passport.use(new LdapStrategy(OPTS));


// from http://code.runnable.com/VOd1LNZyrqxYnQES/nodejs-passport-ldapauth-express-test-for-node-js-and-hello-world
// router.post('/login', function(req, res, next) {
//   passport.authenticate('ldapauth', {session: false}, function(err, user, info) {
//     if (err) {
//       return next(err); // will generate a 500 error
//     }
//     // Generate a JSON response reflecting authentication status
//     if (! user) {
//       return res.send({ success : false, message : 'authentication failed' });
//     }
//     return res.send({ success : true, message : 'authentication succeeded' });
//   })(req, res, next);
// });



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
