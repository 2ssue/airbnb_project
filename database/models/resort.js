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

const makeCondition = (params) => {
  const { start, end, guest, price } = params;
  let resortCondition = {};
  let bookingCondition = {};

  if(start && end){
    bookingCondition = {
      [Sequelize.Op.or]:{
        start_date: { [Sequelize.Op.gte]: new Date(start.split('-'))},
        end_date: { [Sequelize.Op.lte]: new Date(end.split('-'))}
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