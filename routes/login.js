const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const connection = require("../connection");

// USER LOGIN API AND CREATE TOKEN BY JWT
router.post("/", (req, res) => {
  console.log(req.body);
  //var user_id = req.body.user_id;
  var email = req.body.email;
  var password = req.body.password;
  console.log(email, password);
  connection.query(
    "SELECT user_id, first_name , last_name , email FROM users WHERE email = ? AND password = ?",
    [email, password],
    (error, result, fields) => {
      console.log(result[0].user_id);
      if (error) throw error;
      let size = Object.keys(result).length;
      if (size == 0) {
        res.status(400);
        res.send({ message: "Enter Valid Details" });
      } else {
        const token = jwt.sign(
          { id: result[0].user_id },
          config.secert,
          { expiresIn: 86400 },
          { algorithm: "RS256" }
        );
        res.status(200).send({ auth: true, token: token, result });
      }
    }
  );
});


// USER AUTHENTICATION BY TOKEN
router.get("/",  (req, res) => {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader.split(' ')[1];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "No token is provided" });

  jwt.verify(token, config.secert, (error, decoded) => {
    if (error)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token" });
    var email = decoded.email;
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, result) => {
        if (error)
          return res.status(401).send("There was a problem finding the user.");
        if (!result) return res.status(404).send("No user found.");
        console.log(result);
        if(result){
          const validPassword =  bcrypt.compare(body.password, user.password);
        }
        res.status(200).send(result);
      }
    );
    connection.end();
  });
});

module.exports = router;
