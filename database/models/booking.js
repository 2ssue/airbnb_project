'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('booking', {
    book_num: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    booking_date: DataTypes.STRING,
    resort_name: DataTypes.STRING,
    booker_id: DataTypes.STRING
  }, {
    timestamps: false
  });
  Booking.associate = function(models) {
    Booking.belongsTo(models.resort, {
      foreignKey: "resort_name"
    })
    Booking.belongsTo(models.user, {
      foreignKey: "booker_id"
    })
  };
  return Booking;
};