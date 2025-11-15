var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery', { title: 'Gallery' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/advance-business-accounting', function(req, res, next) {
  res.render('learnmore/advance-business-accounting', { title: 'Advance Business Accounting' });
});

router.get('/advanced-stitching', function(req, res, next) {
  res.render('learnmore/advanced-stitching', { title: 'Advanced Stitching' });
});
  
router.get('/basic-business-accounting', function(req, res, next) {
  res.render('learnmore/basic-business-accounting', { title: 'Basic Business Accounting' });
});

router.get('/basic-stitching', function(req, res, next) {
  res.render('learnmore/basic-stitching', { title: 'Basic Stitching' });
});

router.get('/digital-marketing', function(req, res, next) {
  res.render('learnmore/digital-marketing', { title: 'Digital Marketing' });
});

router.get('/diploma-fashion', function(req, res, next) {
  res.render('learnmore/diploma-fashion', { title: 'Diploma in Fashion Design' });
});

router.get('/fashion-styling', function(req, res, next) {
  res.render('learnmore/fashion-styling', { title: 'Fashion Styling' });
});

router.get('/software-specialization', function(req, res, next) {
  res.render('learnmore/software-specialization', { title: 'Software Specialization' });
});

router.get('/surface-ornamentation', function(req, res, next) {
  res.render('learnmore/surface-ornamentation', { title: 'Surface Ornamentation' });
});

module.exports = router;
