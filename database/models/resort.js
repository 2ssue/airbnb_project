'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resort = sequelize.define('resort', {
    name: {
      type:DataTypes.STRING,
      primaryKey: true
    },
    photo_url: DataTypes.TEXT,
    possible_guest: DataTypes.DECIMAL,
    possible_room: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    timestamps: false
  });

  Resort.associate = function(models) {
    Resort.hasMany(models.booking, {onDelete: 'cascade', foreignKey: 'resort_name'});
    Resort.hasMany(models.review, {onDelete: 'cascade', foreignKey: 'resort_name'});
  };

  Resort.getAllResort = async function(){
    return await Resort.findAll();
  }
  
  return Resort;
};