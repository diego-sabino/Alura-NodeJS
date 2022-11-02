'use strict';
module.exports = (sequelize, DataTypes) => {
  const enrollment = sequelize.define('enrollment', {
    status: DataTypes.STRING
  }, {});
  enrollment.associate = function(models) {
    enrollment.belongsTo(models.person, {
      foreignKey: 'student_id'
    }),
    enrollment.belongsTo(models.class, {
      foreignKey: 'class_id'
    });
  };
  return enrolments;
};