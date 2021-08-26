const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const { validationResult } = require("express-validator");
const { validateEmail } = require("../validator");
const saltRounds = 10;

router.post("/", [validateEmail], async (req, res) => {
  let connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "nodejs",
    password: "abhishek123",
    database: "daily_expenses_db",
    port: 3306,
  });

  connection.connect((err) => {
    if (err) {
      console.error("connection is failed" + err.stack);
    }
    console.log("connection is established ");
  });
  // console.log(req.body);
  const errors = validationResult(req);
  console.log(errors, "this is error---------------------------------");
  if (!errors.isEmpty()) {
    return res.send(errors);
  } else {
    let encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    let user_details = {
      user_id: null,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: encryptedPassword,
      accept_tc: parseInt(req.body.accept_tc),
    };
    var sql = "INSERT INTO users SET ? ";
    connection.query(sql, user_details, (error, result) => {
      if (error) {
        console.error(error);
        res.status(400);
        res.json({
          message: "bad request",
        });
      } else {
        let data = {
          status: "success",
          messeage: "insert user value",
        };
        console.log(result);
        res.status(200).send(data);
      }
    });
  }

  // var sql = " SELECT * FROM users WHERE email = ?";
  // connection.query(sql, user_details.email, (error, result) => {
  //   if (error) throw error;
  //     console.log(result);
  //     // console.log("email dont exit!");
  //     let data ={
  //       status: 400,
  //       messge: "email is already present"
  //     }
  //     res.status(400);
  //     res.send(data)

  // });
});
module.exports = router;
