'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('resorts', [{
      name: 'resort1',
      photo_url: '',
      possible_guest: 5.0,
      possible_room: 4,
      price: 100000
    },{
      name: 'resort2',
      photo_url: '',
      possible_guest: 3.1,
      possible_room: 3,
      price: 1000
    },{
      name: 'resort3',
      photo_url: '',
      possible_guest: 2.1,
      possible_room: 2,
      price: 200000
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('resorts', null, {});
  }
};
