var express = require('express');
var Admin = require('../modules/Admin');
var Product = require('../modules/Product');

var router = express.Router();

router.post('/', async (req, res) => {
  try {
    var product = await Product.create(req.body);
    return res.redirect('/product');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// get all products
router.get('/', async (req, res) => {
  try {
    var products = await Product.find({});
    res.render('product', { products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    var id = req.params.id;
    var product = await Product.findById(id);
    res.render('productdetail', { product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//delete the product

router.get('/:id/delete', async (req, res) => {
  try {
    var id = req.params.id;
    var product = await Product.findByIdAndDelete(id);
    return res.redirect('/product');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/:id/edit', async (req, res) => {
  try {
    var id = req.params.id;
    var product = await Product.findById(id);
    res.render('productedit', { product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/:id', async (req, res) => {
  try {
    var id = req.params.id;
    var product = await Product.findByIdAndUpdate(id, req.body);
    return res.redirect('/product/' + id);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
module.exports = router;
