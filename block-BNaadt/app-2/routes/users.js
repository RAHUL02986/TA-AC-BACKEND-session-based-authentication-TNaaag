var express = require('express');
var User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('dashboard');
});
router.get('/register', function (req, res, next) {
  var error = req.flash('error')[0];
  res.render('register', { error });
});
router.post('/register', async (req, res) => {
  try {
    var user = await User.create(req.body);

    if ('email' === user.email) {
      req.flash('error', 'This email is Taken');
      res.redirect('/users/register');
    }

    res.redirect('/users/login');
    console.log(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/login', async (req, res) => {
  var error = req.flash('error')[0];
  res.render('login', { error });
});
router.post('/login', async (req, res) => {
  try {
    var { email, password } = req.body;
    if (!email || !password) {
      req.flash('error', 'Email/password required');

      return res.redirect('/users/login');
    }
    var user = await User.findOne({ email });
    // no user
    if (!user) {
      return res.redirect('/users/login');
    }
    //compaire password
    user.verifyPassword(password, (result) => {
      if (!result) {
        return res.redirect('/users/login');
      }
      //persist logged in user information
      req.session.userId = user.id;
      return res.redirect('/users/dashboard');
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('');
  res.redirect('/users/login');
});

module.exports = router;
