let express = require('express');
let Admin = require('../models/admin');
let User = require('../models/user');
let Comment = require('../models/comment');
let router = express.Router();

router.get('/register', (req, res, next) => {
  res.render('userRegister');
});
router.get('/login', (req, res, next) => {
  res.render('userLogin');
});
router.post('/register', async (req, res) => {
  var user = await User.create(req.body);
  res.redirect('/users/login');
});
router.get('/login', async (req, res) => {
  try {
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.redirect('/admin/login');
    }
    var user = await User.findOne({ email });

    if (!user) {
      return res.redirect('/admin/register');
    }
    user.verifyPassword(password, (err, result) => {
      if (!result) {
        return res.redirect('/admin/login');
      }
      req.session.userId = user.id;
      res.redirect('/products/card');
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
