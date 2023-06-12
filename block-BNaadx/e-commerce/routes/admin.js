let express = require('express');
let Admin = require('../models/admin');
let User = require('../models/user');
let Product = require('../models/product');

let router = express.Router();

router.get('/register', (req, res, next) => {
  res.render('adminRegister');
});

router.get('/login', (req, res, next) => {
  res.render('adminLogin');
});
//create admin profile
router.post('/register', async (req, res) => {
  try {
    var admin = await Admin.create(req.body);
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//display all products on ejs dashboard
router.get('/dashboard', async (req, res) => {
  try {
    var product = await Product.find({});
    res.render('dashboard', { products: product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//authentication to login Admin only
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.redirect('/admin/login');
    }
    var admin = await Admin.findOne({ email });

    if (!admin) {
      return res.redirect('/admin/register');
    }
    admin.verifyPassword(password, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.redirect('/admin/login');
      }
      req.session.adminId = admin.id;
      res.redirect('/admin/dashboard');
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
