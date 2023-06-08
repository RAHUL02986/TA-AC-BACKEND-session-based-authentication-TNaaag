var express = require('express');
var router = express.Router();
var Admin = require('../modules/Admin');
var Product = require('../modules/Product');

router.get('/', function (req, res, next) {
  res.render('adminRegister');
});

router.post('/', async (req, res) => {
  try {
    var admin = await Admin.create(req.body);
    res.redirect('/admin/adminlog');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/adminlog', function (req, res, next) {
  res.render('admin');
});
router.post('/adminlogin', async (req, res) => {
  try {
    var { email, password } = req.body;
    if (!password || !email) {
      return res.render('/admin/adminlog');
    }
    var admin = await Admin.findOne({ email });
    if (!admin) {
      return res.redirect('/admin/adminlog');
    }
    admin.verifyPassword(password, (result) => {
      if (!result) {
        return res.redirect('/admin/adminlog');
      }
      req.session.adminId = admin.id;
      res.redirect('/product');
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
