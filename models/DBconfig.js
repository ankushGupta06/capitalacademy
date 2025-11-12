const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

// Load environment variables
const environment = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[environment];

// Create Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
  logging: (sql) => console.log(`SQL: ${sql}`),
});

const db = { Sequelize, sequelize, Op };

// Test connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully!'))
  .catch((err) => console.error('❌ Database connection error:', err));

// Dynamically import all model files
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  ))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Run associations (if any)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

// Sync all models (without dropping data)
if (process.env.RUN_MODE !== 'seed') {
  sequelize.sync({ alter: true })
    .then(() => console.log('🗄️  All models synchronized'))
    .catch(err => console.error('❌ Sync error:', err));
}

module.exports = db;
