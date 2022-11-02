'use strict';
module.exports = (sequelize, DataTypes) => {
  const person = sequelize.define('person', {
    name: {
      type: DataTypes.STRING,
      validate:  {
        validate: function(data) {
          if (data.length < 3) {
            throw new Error('"name" length must be at least 3 characters long')
          }
        }
      }
    },
    active: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'invalid email'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    paranoid: true,
    defaultScope: { where: { active: true } },
    scopes: {
      all: { where: {} }
    }
  });
  person.associate = function(models) {
    person.hasMany(models.class, {
      foreignKey: 'teacher_id'      
    }),
    person.hasMany(models.enrollment, {
      foreignKey: 'student_id',
      scope: { status: 'confirmed' },
      as: 'registeredClasses'
    });
  };
  return person;
};