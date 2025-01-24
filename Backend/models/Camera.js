const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Zone = require('./Zone');

const Camera = sequelize.define('Camera', {
  name: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: true },
  onvifuser: { type: DataTypes.STRING, allowNull: true },
  onvifpass: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.STRING, defaultValue: 'Active' },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Camera.belongsTo(Zone, { foreignKey: { name: 'zone_id', allowNull: true }, onDelete: 'CASCADE' });

module.exports = Camera;