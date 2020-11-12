let mysql = require('mysql');
const dotenv = require('dotenv').config().parsed


let con = () => {
    mysql.createConnection({
        host: dotenv.DB_HOST,
        user: dotenv.DB_USER,
        password: dotenv.DB_PASS
      });
}

module.exports = con