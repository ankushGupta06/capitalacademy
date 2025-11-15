const express = require('express');
const router = express.Router();
const db = require('../models/DBconfig');
const { User } = db;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ======================= REGISTER ROUTE =======================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Prevent duplicate emails
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Default role = faculty
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'faculty'
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================= LOGIN ROUTE =======================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send('User not found');

    // Validate password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid credentials');

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // ✅ Save token inside cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });

    // ✅ Redirect based on role
    if (user.role === 'faculty') {
      return res.json({
        success: true,
        redirect: "/contact/admin/dashboard"
      });

    } else {
      return res.json({
        success: true,
        redirect: "/login"
      });
    }

  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ======================= LOGOUT ROUTE =======================
router.get('/logout', (req, res) => {
  // Clear JWT token cookie
  res.clearCookie('token');

  // Redirect to login page
  return res.redirect('/');
});


module.exports = router;
