'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    resort_name: DataTypes.STRING,
    star: DataTypes.DECIMAL,
    content: DataTypes.STRING,
    reviewer_id: DataTypes.STRING
  }, {
    timestamps: false
  });
  Review.associate = function(models) {
    Review.belongsTo(models.resort, {
      foreignKey: "resort_name"
    })
    Review.belongsTo(models.user, {
      foreignKey: "reviewer_id"
    })
  };
  return Review;
};