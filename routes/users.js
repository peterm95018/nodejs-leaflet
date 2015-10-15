var express = require('express');
var router = express.Router();
var session = require('express-session'); // called by app.use(session()) and stores auth vars

var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');

var OPTS = {
  server: {
    url: 'ldaps://ldap-99.soe.ucsc.edu:636',
    bindDn: '',
    searchBase: 'ou=People,dc=crm,dc=ucsc,dc=edu',
    // searchFilter: '(uid={{username}})',
    // bindCredentials: '{{password}}',
    searchFilter: '(uid={{username}})',
    bindCredentials: '{{password}}',
    searchAttributes: []
  }
}

passport.use(new LdapStrategy(OPTS));


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



// This works as a CruzID Blue auth block
// from http://code.runnable.com/VOd1LNZyrqxYnQES/nodejs-passport-ldapauth-express-test-for-node-js-and-hello-world
// router.post('/login', function(req, res, next) {
//   passport.authenticate('ldapauth', {session: false}, function(err, user, info) {
//     if (err) {
//       return next(err); // will generate a 500 error
//     }
//     // Generate a JSON response reflecting authentication status
//     if (! user) {
//       return res.send({ success : false, message : 'authentication failed'});
//     }
//     return res.send({ success : true, message : 'authentication succeeded' + req.user });
    
//   })
//   (req, res, next);
// });



// This works as a CruzID Blue auth block
// The req.user object contains all the values returned from the LDAP bind
// req.user.uid is peterm, etc.
// This needs an isAuthenticated function type of function
router.post('/login', passport.authenticate('ldapauth', {session: false}), 
	function(req, res) {
    //res.send({status: 'ok'});
    //req.user.authenticated = TRUE;
		console.log('Authentication Successful');
    console.log(req.user);
		req.flash('success', 'You are logged in');
		res.redirect('/');

	});

router.get('/logout', function(req, res) {
  req.logout;
  req.flash('success', 'You have logged out');
  res.redirect('/users/login');
});


module.exports = router;
