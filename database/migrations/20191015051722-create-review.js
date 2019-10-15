'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('reviews', {
      id:{
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      resort_name: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      star: {
        allowNull: false,
        type: Sequelize.DECIMAL(2,1)
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      reviewer_id: {
        allowNull: false,
        type: Sequelize.STRING(20)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('reviews');
  }
};