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
  
  User.findUser = async function(content){
    const { userId, password } = content;
    return await User.findOne({
      attributes: ['name'],
      where: {
        userid: userId,
        password
      }
    })
  };

  User.createUserIfNotExists = async function(content){
    const { userId, password, name } = content;
    const [ userData, result ] = await User.findOrCreate({
      where: {
        userid: userId,
        password, 
        name
      }
    });
    
    return result;
  }

  User.findUserById = async function(userId){
    const user = await User.findOne({
      where: {
        userid: userId
      }
    });

    return user ? true : false;
  }

  User.associate = function(models) {
    User.hasMany(models.booking, {onDelete: 'cascade', foreignKey: 'guest_id'});
    User.hasMany(models.review, {onDelete: 'cascade', foreignKey: 'reviewer_id'});
  };
  return User;
};