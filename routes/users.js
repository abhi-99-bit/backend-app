const express = require('express');
const router = express.Router();
const mysql = require('mysql');




router.post('/', (req, res) => {

  let connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'root',
    database: 'daily_expenses_db'
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('connection is failed' + err.stack);
    }
    console.log('connection is established ');
  })
  console.log(req.body);

  let user_details = {
    user_id: null,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    accept_tc: parseInt(req.body.accept_tc),
  }
  console.log(user_details);
  var sql = "INSERT INTO users SET ? ";
  connection.query(sql, user_details, (error, result) => {
    if (error) {
      console.error(error);
      res.status(400);
      res.json({
        message: 'bad request'
      });
    } else {
      console.log(result);
      res.status(200);
      res.json({
        messge: 'Get the user value'
      })
    }
  });
  connection.end((err) => {
    if (err) {
      console.error(err);
    }
    console.log('connection terminated succesfully');

  });

});

module.exports = router;