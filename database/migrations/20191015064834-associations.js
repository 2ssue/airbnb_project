/**
 * 데이터베이스 생성 후 외래키 관계 설정
 */

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('reviews', ['resort_name'], {
        type: 'foreign key',
        name: 'fk_review_resort_name', 
        references: {
          table: 'resorts',
          field: 'name'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }), 
      queryInterface.addConstraint('reviews', ['reviewer_id'], {
        type: 'foreign key',
        name: 'reviewer_id', 
        references: {
          table: 'users',
          field: 'userid'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('bookings', ['booker_id'], {
        type: 'foreign key',
        name: 'booker_id', 
        references: {
          table: 'users',
          field: 'userid'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('bookings', ['resort_name'], {
        type: 'foreign key',
        name: 'fk_booking_resort_name', 
        references: {
          table: 'resorts',
          field: 'name'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('reviews', 'fk_review_resort_name'),
      queryInterface.removeConstraint('reviews', 'reviewer_id'),
      queryInterface.removeConstraint('bookings', 'fk_booking_resort_name'),
      queryInterface.removeConstraint('bookings', 'booker_id')
    ]);
  }
};
