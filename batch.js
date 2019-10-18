const filename = process.argv[2] || '';

try{
    const fs = require('fs');
    const fileData = fs.readFileSync(filename, 'utf8').trim();
    const sequelize = require('./database/models').sequelize;

    sequelize.sync().then(() => {
        console.log('parsing...');
        const parse = require('csv-parse');
        const output = [];
        parse(fileData, {
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
                console.log('insert error', err.message);
            }).finally(() => {
                sequelize.close();
            })
        });
    }).catch(err => {
        console.log('database sync error', err.message);
        sequelize.close();
    })
}catch(err){
    console.log('file error:', err.message);
}
