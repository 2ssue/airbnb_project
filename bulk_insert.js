const parse = require('csv-parse');
const filename = process.argv[2];

if(!filename){
    console.error('변환할 파일을 입력하세요');
    return;
}

const fs = require('fs');
let csvData;
try{
    csvData = fs.readFileSync(filename, 'utf8').trim();
}catch(err){
    console.error(`error: 존재하지 않는 파일 [${filename}]`);
    return;
}

const sequelize = require('./database/models').sequelize;

sequelize.sync().then(() => {
    console.log('parsing...');
    try{
        const output = [];
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
    }catch(err){
        console.error('올바른 형식의 파일이 아닙니다');
        process.exit();
    }
});
