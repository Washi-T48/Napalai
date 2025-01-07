const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Camera = require('./Camera');

const ViolenceDetectionEvent = sequelize.define('ViolenceDetectionEvent', {
  event_time: { type: DataTypes.DATE, allowNull: false },
  description: { type: DataTypes.TEXT },
  is_kept: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

ViolenceDetectionEvent.belongsTo(Camera, { foreignKey: 'camera_id', onDelete: 'CASCADE' });

module.exports = ViolenceDetectionEvent;
