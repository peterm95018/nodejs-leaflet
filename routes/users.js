var express = require('express');
var router = express.Router();
var session = require('express-session'); // called by app.use(session()) and stores auth vars

var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');

// var OPTS = {
//   server: {
//     url: 'ldaps://ldap-99.soe.ucsc.edu:636',
//     bindDn: '',
//     searchBase: 'ou=People,dc=crm,dc=ucsc,dc=edu',
//     searchFilter: '(uid={{username}})',
//     bindCredentials: '{{password}}'
//   }
// }
// 
// passport.use(new LdapStrategy(OPTS));


var getLDAPConfiguration = function(req, callback) {
	//fetching things from database or whatever
	process.nextTick(function() {
		var OPTS = {
  server: {
    url: 'ldaps://ldap-99.soe.ucsc.edu:636',
    bindDn: '',
    searchBase: 'ou=People,dc=crm,dc=ucsc,dc=edu',
    searchFilter: '(uid={{username}})',
    bindCredentials: '{{password}}'
  }
};
callback(null, OPTS);
});
};

passport.use(new LdapStrategy(getLDAPConfiguration, function(user, done) {
  return done(null, user);
}));


// used to serialize the user object for this session
    passport.serializeUser(function(user, done) {
        done(null, user.uidNumber);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
/* GET users listing. */
router.get('/', function(req, res, next) {

});

/* users/register */
router.get('/register', function(req, res, next) {
  res.render('register', {
  	'title': 'Register'
  });
//console.log('req.session.me: ' + req.session.user.givenName + ' ' + req.session.user.ucscPersonSn);
});


/* users/login */
router.get('/login', function(req, res, next) {
  res.render('login', {
  	'title': 'Login'
  });
});

// requireLogin can then be added to other routes that need protection
function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/users/login');
  } else {
    next();
  }
};

/* profile route */
/* requires a valid login to get to the page */
router.get('/profile', requireLogin, function(req, res, next) {
  res.render('profile', {
    'title': 'Profile'
  });

});


// This works as a CruzID Blue auth block, but needs further work and testing. session
// not working
// from http://code.runnable.com/VOd1LNZyrqxYnQES/nodejs-passport-ldapauth-express-test-for-node-js-and-hello-world
router.post('/login', function(req, res, next) {
  passport.authenticate('ldapauth', {session: true}, function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      req.flash('success', 'Authentication Failed');
      res.redirect('/users/login');
      return
      //return res.send({ success : false, message : 'authentication failed'}, res.redirect('/users/login'));
    }
    // we're authenticated via LDAP
  
    //console.log('user: %j', user);
    req.session.user = user;
    res.locals.user = user;
    req.flash('success', 'You are logged in ' + req.session.user.uid);
    res.redirect('/')
    return user;
  })(req, res, next);

});



// This works as a CruzID Blue auth block
// The req.user object contains all the values returned from the LDAP bind
// req.user.uid is peterm, etc.
// This needs an isAuthenticated function type of function
// router.post('/login', passport.authenticate('ldapauth', {session: false}), 
// 	function(req, res) {
//     // if we got here we've successfully logged in
// 		console.log('Authentication Successful');
//     //console.log(req.user);
// 		req.flash('success', 'You are logged in');
// 		res.redirect('/');
// 	});
// 	
	


// logout the user
router.get('/logout', function(req, res) {
  var name = req.session.user.uid;
  console.log('logging out ' + req.session.user.uid);
  req.logout();
  req.flash('success', 'You have been successfully logged out ' + name);
  res.redirect('/');
});




module.exports = router;
