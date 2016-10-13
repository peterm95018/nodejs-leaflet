var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Members' });
});

router.get('/profile', ensureAuthenticated, function(req, res, next) {
	res.locals.testUser = req.session.passport.user;
  res.render('profile', { title: 'Profile' });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;
