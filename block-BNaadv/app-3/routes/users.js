var express = require('express');
var router = express.Router();
var User = require('../modules/User');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users');
});

router.get('/register', function (req, res, next) {
  var error = req.flash('error');

  res.render('register', { error });
});
router.post('/register', async (req, res) => {
  try {
    var user = await User.create(req.body);
    res.redirect('/users/login');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/login', function (req, res, next) {
  var error = req.flash('error');

  res.render('login', { error });
});

router.post('/login', async (req, res) => {
  try {
    var { email, password } = req.body;
    if (!email || !password) {
      req.flash('error', 'email/password required');
      return res.redirect('/users/login');
    }
    var user = await User.findOne({ email });
    // if (err) return next(err);
    //no user
    if (!user) {
      req.flash('error', 'user is not register  ');
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (result) => {
      if (!result) {
        return res.redirect('/users');
      }
      req.session.userId = user.id;
      return res.redirect('/users');
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
