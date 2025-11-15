var express = require('express');
var router = express.Router();
const db = require('../models/DBconfig');
const { Course } = db;
const authenticateToken = require('../middleware/auth');

// =================== PUBLIC ROUTES ===================

// GET all courses (public)
router.get('/', async (req, res, next) => {
  res.render('course', { title: 'Courses' });
});

// GET single course detail (public)
router.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (err) {
    next(err);
  }
});

// ================= PUBLIC COURSE PAGE =================
router.get('/view/:id', async (req, res, next) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).render('404', { title: 'Not Found' });
    res.render('coursedetail', { title: course.title, course });
  } catch (err) {
    next(err);
  }
});

// =================== ADMIN-ONLY ROUTES ===================

// POST new course (admin only)
router.post('/', authenticateToken(['admin']), async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
});

router.get('/admin/:id', async (req, res, next) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).render('404', { title: 'Not Found' });
    res.render('adminCourseDetail', { title: `Edit ${course.title}`, course });
  } catch (err) {
    next(err);
  }
});

// UPDATE course (admin only)
router.put('/:id', authenticateToken(['admin']), async (req, res, next) => {
  try {
    const updated = await Course.update(req.body, { where: { id: req.params.id } });
    if (!updated[0]) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course updated successfully' });
  } catch (err) {
    next(err);
  }
});

// DELETE course (admin only)
router.delete('/:id', authenticateToken(['admin']), async (req, res, next) => {
  try {
    const deleted = await Course.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
