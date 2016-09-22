var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LdapStrategy = require('passport-ldapauth');

var User = require('../models/user');

/** 
 * For our CRM LDAP auth, we don't bindDN
 * Note: we use {{}} for username, but not password
 */
var getLDAPConfiguration = function(req, callback) {
  // Fetching things from database or whatever
  process.nextTick(function() {
    var opts = {
      server: {
        url: 'ldaps://ldap-99.soe.ucsc.edu:636',
        searchBase: 'ou=People,dc=crm,dc=ucsc,dc=edu',
        searchFilter: "(uid={{username}})",
        bindCredentials: "password",
      }
    };
	
    callback(null, opts);
  });
};

passport.use(new LdapStrategy(getLDAPConfiguration, function(user, done) {
    return done(null, user);
  }
));

// used to serialize the user object for this session
passport.serializeUser(function(user, done) {  
    return done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(user, done) {
    var username = user['uid'];
	User.getUserByUsername(username, function(err, user, req, res) {
		if(err) done(err);
		if(!user) {
			return done(null, false, {message: 'Unknown User'});
		} else {
			// do other application logic and set app vars
			successFlash: {'Successfly Logged In'}
		}
		return done(err, user);
	});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Get Register page */
router.get('/register', function(req, res, next) {
  res.render('register',{title:'Register'});
});
/* Get login page */
router.get('/login', function(req, res, next) {
  res.render('login', {title:'Login'});
});

/* router POST from passport-ldapauth page*/
router.post('/login',
  passport.authenticate('ldapauth', { 
  	session: true, 
  	failureFlash: true,
  	failureRedirect:'/users/login', 
  	failureFlash: 'Invalid username or password'}), 
  function(req, res) {
  	/* logged in as username */
   req.flash('success', 'You are now logged in ' +req.session.passport.user.uid);
	/* redirect to secured page */
   res.redirect('/');
});


/** 
 * Below is code that can be used for a passport local
 * strategy
 */


/* known good Udemy working code down to line 89
router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: 'Invalid username or password'}),
  function(req, res) {
   req.flash('success', 'You are now logged in');
   res.redirect('/');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done){
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message:'Invalid Password'});
      }
    });
  });
}));
*/



router.post('/register', upload.single('profileimage') ,function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(req.file){
  	console.log('Uploading File...');
  	var profileimage = req.file.filename;
  } else {
  	console.log('No File Uploaded...');
  	var profileimage = 'noimage.jpg';
  }

  // Form Validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('username','Username field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('register', {
  		errors: errors
  	});
  } else{
  	var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success', 'You are now registered and can login');

    res.location('/');
    res.redirect('/');
  }
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/users/login');
});

module.exports = router;
