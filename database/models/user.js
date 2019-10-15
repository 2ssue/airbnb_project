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
    User.hasMany(models.booking, {onDelete: 'cascade', foreignKey: 'guest_id'});
    User.hasMany(models.review, {onDelete: 'cascade', foreignKey: 'reviewer_id'});
  };
  return User;
};