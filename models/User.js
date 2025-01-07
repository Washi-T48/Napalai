const { DataTypes } = require('sequelize');
const sequelize = require('./index.js');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = User;
