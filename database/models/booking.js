'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('booking', {
    book_num: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    check_out: DataTypes.DATE,
    check_in: DataTypes.DATE,
    resort_name: DataTypes.STRING,
    guest_id: DataTypes.STRING
  }, {
    timestamps: false
  });

  Booking.associate = function(models) {
    Booking.belongsTo(models.resort, {
      foreignKey: "resort_name"
    })
    Booking.belongsTo(models.user, {
      foreignKey: "guest_id"
    })
  };
  return Booking;
};