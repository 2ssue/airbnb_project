'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('resorts', {
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(500)
      },
      photo_url: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      reservation: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('resorts');
  }
};