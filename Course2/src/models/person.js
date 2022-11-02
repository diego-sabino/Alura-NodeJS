'use strict';
module.exports = (sequelize, DataTypes) => {
  const person = sequelize.define('person', {
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  person.associate = function(models) {
    person.hasMany(models.class, {
      foreignKey: 'teacher_id'      
    }),
    person.hasMany(models.enrollment, {
      foreignKey: 'student_id'
    });
  };
  return person;
};