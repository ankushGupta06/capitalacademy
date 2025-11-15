const bcrypt = require('bcrypt');
const db = require('../models/DBconfig'); // loads models/index.js or DBconfig.js
const { User } = db;

async function seedAdmin() {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@capitalacademy.com' } });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists.');
      return;
    }

    // Create admin
    await User.create({
      name: 'Admin',
      email: 'admin@capitalacademy.com',
      password: hashedPassword
    });

    console.log('✅ Admin user seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding admin user:', err);
  } finally {
    await db.sequelize.close(); // Close connection after running
  }
}

seedAdmin();
