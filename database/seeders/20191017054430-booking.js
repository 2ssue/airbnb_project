'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'bookings',
      [
        {
          check_in: new Date([2019, 10, 17]),
          check_out: new Date([2019, 10, 19]),
          resort_name: 'resort3',
          guest_id: 'user1',
        },
        {
          check_in: new Date([2019, 10, 16]),
          check_out: new Date([2019, 10, 18]),
          resort_name: 'resort3',
          guest_id: 'user2',
        },
        {
          check_in: new Date([2019, 10, 17]),
          check_out: new Date([2019, 10, 19]),
          resort_name: 'resort3',
          guest_id: 'user3',
        },
        {
          check_in: new Date([2019, 10, 17]),
          check_out: new Date([2019, 10, 19]),
          resort_name: 'resort1',
          guest_id: 'user3',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bookings', null, {});
  },
};
