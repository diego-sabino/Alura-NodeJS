'use strict';
module.exports = (sequelize, DataTypes) => {
  const level = sequelize.define('level', {
    desc_level: DataTypes.STRING
  }, { paranoid: true });
  level.associate = function(models) {
    level.hasMany(models.class, {
      foreignKey: 'level_id'
    });
  };
  return level;
};