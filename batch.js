const filename = process.argv[2] || '';

try{
    const fs = require('fs');
    const fileData = fs.readFileSync(filename, 'utf8').trim();
    const { resort } = require('./database/models');
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
            resort.bulkCreate(output).then(() => {
                console.log('...complete');
            }).catch(err => {
                console.error('insert error', err.message);
            })
        })
}catch(err){
    console.error('file error:', err.message);
}
