'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('resorts', [{
      name: 'resort1',
      photo_url: 'https://www3.hilton.com/resources/media/hi/CZMPCHH/en_US/img/shared/full_page_image_gallery/main/HH_outpool01_7_1270x560_FitToBoxSmallDimension_Center.jpg',
      reservation: 5,
      price: 100000
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('resorts', null, {});
  }
};
