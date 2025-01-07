const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Camera = require('./Camera');

const ForgottenItemEvent = sequelize.define('ForgottenItemEvent', {
  event_time: { type: DataTypes.DATE, allowNull: false },
  item_description: { type: DataTypes.TEXT },
  is_resolved: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

ForgottenItemEvent.belongsTo(Camera, { foreignKey: 'camera_id', onDelete: 'CASCADE' });

module.exports = ForgottenItemEvent;
