module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    duration: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT }
  });
  return Course;
};
