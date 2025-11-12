module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    phone: { type: DataTypes.STRING, validate: { is: /^[0-9\-\+\s]{7,15}$/i } },
    message: { type: DataTypes.TEXT }
  },
  {
  timestamps: true,
  tableName: 'contacts'
});
  return Contact;
};
