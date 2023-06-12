let express = require('express');
let Admin = require('../models/admin');
let User = require('../models/user');
let Product = require('../models/product');
let Comment = require('../models/comment');
let router = express.Router();
//page for creating product
router.get('/new', (req, res, next) => {
  res.render('createProduct');
});
//create product with details and save it in DB
router.post('/new', async (req, res) => {
  try {
    var product = await Product.create(req.body);
    res.redirect('/admin/login');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/:id/detail', async (req, res) => {
  try {
    var id = req.params.id;
    var product = await Product.findById(id);
    res.render('productDetail', { product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//render all products
router.get('/', async (req, res) => {
  try {
    var products = await Product.find({});
    res.render('products', { products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//edit product
router.get('/:id/edit', async (req, res) => {
  try {
    var id = req.params.id;
    var product = await Product.findById(id);
    res.render('editProduct', { product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//for edited product
router.post('/:id', async (req, res) => {
  try {
    var id = req.params.id;
    var product = await Product.findByIdAndUpdate(id, req.body);
    console.log(product);
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/:id/delete', async (req, res) => {
  try {
    var id = req.params.id;
    var product = await Product.findByIdAndDelete(id);
    console.log(product);
    res.redirect('/admin/dashboard');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/card', async (req, res) => {
  try {
    var product = await Product.find({});
    res.render('card',{product});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
