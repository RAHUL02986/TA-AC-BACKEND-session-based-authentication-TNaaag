var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users');
});

router.get('/register', (req, res, next) => {
  res.render('register');
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
  res.render('login');
});

module.exports = router;
