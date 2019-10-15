'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resort = sequelize.define('resort', {
    name: {
      type:DataTypes.STRING,
      primaryKey: true
    },
    photo_url: DataTypes.TEXT,
    reservation: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  Resort.associate = function(models) {
    Resort.hasMany(models.booking, {onDelete: 'cascade'});
    Resort.hasMany(models.review, {onDelete: 'cascade'});
  };
  return Resort;
};