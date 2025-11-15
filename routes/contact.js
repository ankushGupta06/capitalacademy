var express = require('express');
var router = express.Router();
const path = require('path');
const db = require('../models/DBconfig');
const { Contact } = db;
const authenticateToken = require('../middleware/auth');

/* GET static contact form page */
router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

/* POST contact form data */
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    await Contact.create({ name, email, phone, message });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// ---- faculty protected routes below ----

router.get('/all', authenticateToken(['faculty']), async (req, res, next) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticateToken(['faculty']), async (req, res, next) => {
  try {
    await Contact.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticateToken(['faculty']), async (req, res, next) => {
  try {
    await Contact.update(req.body, { where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// router.get('/admin/dashboard', authenticateToken(['faculty']), async (req, res) => {
//   user = req.user;
//   totalcount = await Contact.count();
//   todaycount = await Contact.count({
//     where: {
//       createdAt: { $gte: new Date(new Date() - 24 * 60 * 60 * 1000) }
//     }
//   });
//   pendingcount = await Contact.count({
//     where: {
//       status: 'pending'
//     }
//   });
//   res.render('Admin/index', { title: 'Admin Dashboard', user, totalcount, todaycount, pendingcount });
// });

router.get('/admin/dashboard', authenticateToken(['faculty']), async (req, res) => {
  try {
    const totalcount = await Contact.count();

    const todaycount = await Contact.count({
      where: {
        createdAt: {
          [db.Sequelize.Op.gte]: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    });

    const pendingcount = await Contact.count({
      where: { status: 'pending' }
    });


    const resolvedcount = totalcount - pendingcount;

    const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });

    res.render('admin/dashboard', {
      user: req.user,
      totalcount,
      todaycount,
      pendingcount,
      resolvedcount,
      contacts
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Dashboard Error");
  }
});




router.get('/admin/contacts', authenticateToken(['faculty']), async (req, res, next) => {
  try {
    const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
    res.render('Admin/contacts', { title: 'Manage Contacts', contacts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
