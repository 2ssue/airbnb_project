'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bookings', {
      book_num: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT,
      },
      check_in: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      check_out: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      resort_name: {
        allowNull: false,
        type: Sequelize.STRING(500),
      },
      guest_id: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bookings');
  },
};
