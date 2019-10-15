'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bookings', {
      book_num: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      booking_date: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      resort_name: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      guest_id: {
        allowNull: false,
        type: Sequelize.STRING(20)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookings');
  }
};