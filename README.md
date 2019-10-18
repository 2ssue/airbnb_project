# Airbnb WebPage Project

<a href="https://github.com/2ssue/membership-airbnb/wiki/API">
    <img alt="project-management" src="https://img.shields.io/badge/api--document-wiki-informational" target="_blank" />
</a>
<a href="https://github.com/2ssue/membership-airbnb/wiki/Database-Structure">
    <img alt="project-management" src="https://img.shields.io/badge/database--document-wiki-blue" target="_blank" />
</a>

## 🏠 PUBLISH NOT YET

## Install
```bash
$ npm install
```

## Usage
### Start Server
```bash
# Note
# 
# You have to make .env file before start.
# This project don't inform database information. checkout `.env.dev`
$ npm start
```
### Insert bulk data to resort table
```bash
$ node batch.js ${filename}
```

## Project Structure
This project's structure is based on [express generator](https://expressjs.com/ko/starter/generator.html)

```bash
.
├── app.js
├── bin
│   └── www
├── auth                    # jwt authenticate             
├── database                # database model, migration, seed data made with sequelize-cli
├── public
├── routes                  # server routing 
└── views                   # pug files
```

### Database


## Tech
module name|description|
---|---|
[Express](https://expressjs.com/)|Fast, unopinionated, minimalist web framework for Node.js|
[mysql2](https://www.npmjs.com/package/mysql2)|MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl|
[dotenv](https://www.npmjs.com/package/dotenv)|Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.|
[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)|An implementation of JSON Web Tokens. This was developed against draft-ietf-oauth-json-web-token-08. It makes use of node-jws|
[csv-parse](https://www.npmjs.com/package/csv-parse)|Part of the CSV module, this project is a parser converting CSV text input into arrays or objects. It implements the Node.js stream.Transform API.|
[sequelize](https://www.npmjs.com/package/sequelize)|Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.|
[sequelize-cli](https://www.npmjs.com/package/sequelize-cli)|The Sequelize Command Line Interface (CLI)|

## Author
Sujeong Lee
- Github: [@2ssue](https://github.com/2ssue)