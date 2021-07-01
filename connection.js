const mysql = require('mysql');


const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'daily_expenses_db'
});

connection.connect((error)=>{
    if(error) throw error;
    console.log('connection is established');
})

module.exports = connection;