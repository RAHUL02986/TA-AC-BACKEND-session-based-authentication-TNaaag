var express = require('express');

var router = express.Router();
var Article = require('../modules/Article');

router.get('/', async (req, res) => {
  try {
    var articles = await Article.find({});
    res.render('article', { articles });
  } catch (error) {}
});
router.post('/', async (req, res) => {
  try {
    var article = await Article.create(req.body);
    res.redirect('/article');
  } catch {
    res.status(404).json({ message: error.message });
  }
});
//fetch only one article
router.get('/:id', async (req, res) => {
  try {
    var id = req.params.id;
    var articles = await Article.findById(id);
    res.render('articledetail', { articles });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//updating article form
router.get('/:id/edit', async (req, res) => {
  try {
    var id = req.params.id;
    var article = await Article.findById(id);
    res.render('editArticle', { article });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//update article
router.post('/:id', async (req, res) => {
  try {
    var id = req.params.id;
    var article = await Article.findByIdAndUpdate(id, req.body);
    return res.redirect('/article/' + id);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//delete article
router.get('/:id/delete', async (req, res) => {
  try {
    var id = req.params.id;
    var article = await Article.findByIdAndDelete(id);
    res.redirect('/article');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
