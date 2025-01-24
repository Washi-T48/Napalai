const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Camera = require('./Camera');

const ForgottenItemEvent = sequelize.define('ForgottenItemEvent', {
  event_time: { type: DataTypes.DATE, allowNull: false },
  item_description: { type: DataTypes.TEXT ,allowNull: true},
  is_kept: { type: DataTypes.BOOLEAN, defaultValue: false },
  itemName: { type: DataTypes.STRING, allowNull: true }, // เพิ่มฟิลด์ itemName
  ownerName : { type: DataTypes.STRING, allowNull: true },
  timeReturn :{ type: DataTypes.STRING, allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

ForgottenItemEvent.belongsTo(Camera, { foreignKey: 'camera_id', onDelete: 'CASCADE' });

module.exports = ForgottenItemEvent;
