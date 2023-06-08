var express = require('express');
var User = require('../modules/User');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('register');
});

router.post('/', async (req, res) => {
  try {
    var user = await User.create(req.body);
    return res.redirect('/users/login');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    var { email, password } = req.body;
    if (!email || !password) {
      return res.redirect('/users/login');
    }
    var user = await User.findOne({ email });
    if (!user) {
      return res.redirect('/users/login');
    }
    user.verifyPassword(password, (result) => {
      if (!result) {
       return res.redirect('/article');
      }
      req.session.usersId = user.id;
      res.redirect('/article', { user });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
