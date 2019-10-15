'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userid: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    timestamps: false
  });
  User.associate = function(models) {
    User.hasMany(models.booking, {onDelete: 'cascade'});
    User.hasMany(models.review, {onDelete: 'cascade'});
  };
  return User;
};