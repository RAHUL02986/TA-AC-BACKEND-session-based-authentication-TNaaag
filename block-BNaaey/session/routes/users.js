var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/register', function (req, res, next) {
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
router.get('/login', async (req, res) => {
  res.render('login');
});
router.post('/login', async (req, res) => {
  try {
    var { email, password } = req.body;
    if (!email || !password) {
      res.redirect('/users/login');
    }
    var user = await User.findOne({ email });
    //no user
    if (err) return next(err);
    if (!user) {
      res.redirect('/users/login');
    }
    //compair password
    user.verifyPassword(password, (err,result)=>{
      if(!result){
        res.redirect('/users/login')
      }
    })
  } catch (error) {}
});

module.exports = router;
