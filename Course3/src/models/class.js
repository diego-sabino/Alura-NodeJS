'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
    start_date: DataTypes.DATEONLY
  }, { paranoid: true });
  Class.associate = function(models) {
    Class.hasMany(models.enrollment, {
      foreignKey: 'class_id'
    })
    Class.belongsTo(models.person, {
      foreignKey: 'teacher_id'      
    }),
    Class.belongsTo(models.level, {
      foreignKey: 'level_id'
    });
  };
  return Class;
};