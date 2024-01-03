const mysql = require('mysql2');

require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',  
    database: 'pbl6',
    multipleStatements: false
})
connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Connected')
})
module.exports = connection;