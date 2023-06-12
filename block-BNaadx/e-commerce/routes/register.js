var express = require('express');
let User = require('../models/user');

var router = express.Router();
router.get('/', (req, res, next) => {
  res.render('register');
});
//new registration details
router.post('/register', async (req, res) => {
  try {
    var admin = await Admin.create(req.body);
    res.redirect('/login');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
module.exports = router;
