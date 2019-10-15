'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      userid: 'user1',
      password: 'password1',
      name: 'user01',
    }, {
      userid: 'user2',
      password: 'password2',
      name: 'user02',
    }, {
      userid: 'user3',
      password: 'password3',
      name: 'user03',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
