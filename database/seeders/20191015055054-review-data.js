'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'reviews',
      [
        {
          resort_name: 'resort1',
          star: 5.0,
          content: 'great',
          reviewer_id: 'user1',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  },
};
