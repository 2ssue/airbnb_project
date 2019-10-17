const parse = require('csv-parse');
const filename = process.argv[2];
const fs = require('fs');
const output = [];
const csvData = fs.readFileSync(filename, 'utf8').trim();
const sequelize = require('./database/models').sequelize;

sequelize.sync().then(() => {
    console.log('parsing...');
    parse(csvData, {
        trim: true,
        cast: true,
        columns: ['name','photo_url','possible_guest','possible_room','price'],
    }).on('readable', function(){
        let record
        while(record = this.read()){
            output.push(record);
        }
    }).on('end', function(){
        sequelize.models.resort.bulkCreate(output).then(() => {
            console.log('...complete');
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            sequelize.close();
        })
    });
});
