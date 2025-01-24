const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Zone = sequelize.define('Zone', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Zone;
