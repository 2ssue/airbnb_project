'use strict';
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Resort = sequelize.define('resort', {
    name: {
      type:DataTypes.STRING,
      primaryKey: true
    },
    photo_url: DataTypes.TEXT,
    possible_guest: DataTypes.DECIMAL,
    possible_room: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    timestamps: false
  });

  Resort.associate = function(models) {
    Resort.hasMany(models.booking, {onDelete: 'cascade', foreignKey: 'resort_name'});
    Resort.hasMany(models.review, {onDelete: 'cascade', foreignKey: 'resort_name'});
  };

  Resort.getAllResort = async function(){
    return await Resort.findAll();
  }

  Resort.getPartResort = async function(params){
    const [resortCondition, bookingCondition] = makeCondition(params);

    return await Resort.findAll({
      //'*'을 넣어서 하면 전체 컬럼에 대한 결과가 나오지 않아서 컬럼을 전부 입력하였음
      attributes: ['name', 'photo_url', 'possible_guest', 'possible_room', 'price', [sequelize.fn('count', sequelize.col('bookings.resort_name')), 'booked']],
      where: resortCondition,
      include: [{
        model: sequelize.models.booking,
        attributes: [],
        required: false, //false: LEFT OUTER JOIN, true: INNER JOIN
        where: bookingCondition,
      }],
      group: ['name']
    })
  }

  return Resort;
};

/**
 * 전송받은 파라미터에 따른 조건 객체를 만드는 함수
 * 
 * @param {Object} params 
 * @return {ObjectArray} 생성한 조건 객체
 */
const makeCondition = (params) => {
  const { checkIn, checkOut, guest, price } = params;
  let resortCondition = {};
  let bookingCondition = {};

  if(checkIn && checkOut){
    bookingCondition = {
      [Sequelize.Op.or]:{
        check_in: { [Sequelize.Op.gte]: new Date(checkIn.split('-'))},
        check_out: { [Sequelize.Op.lte]: new Date(checkOut.split('-'))}
      }
    };
  }

  if(guest){
    resortCondition.possible_guest = { [Sequelize.Op.gte]: guest };
  }

  if(price){
    resortCondition.price = { [Sequelize.Op.lte]: price };
  }

  return [resortCondition, bookingCondition];
}