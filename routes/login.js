const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
const connection = require("../connection");
const bcrypt = require("bcrypt");

// USER LOGIN API AND CREATE TOKEN BY JWT
router.post("/", async (req, res) => {
  console.log(req.body);
  //var user_id = req.body.user_id;
  var email = req.body.email;
  var password = req.body.password;
  console.log(email, password);
  await connection.query(
    "SELECT user_id, first_name , last_name , email ,password FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      console.log(results[0].user_id, results[0].password);

      if (error) {
        res.send({
          code: 400,
          failed: "error occurred",
          error: error,
        });
      } else {
        let size = Object.keys(results).length;
        let comparison;
        if (size > 0) {
          comparison = await bcrypt.compare(password, results[0].password);
          if (comparison) {
            const token = jwt.sign(
              { id: results[0].user_id },
              config.secert,
              { expiresIn: 86400 },
              { algorithm: "RS256" }
            );
            res.status(200).send({
              auth: true,
              token: token,
              results,
              code: 200,
              success: "login successful",
            });
          } else {
            res.send({
              code: 204,
              error: "Email and password does not match",
            });
          }
        } else {
          res.send({
            code: 206,
            error: "Email does not exist",
          });
        }
      }

      // if (error) throw error;

      // if (size == 0) {
      //   res.status(400);
      //   res.send({ message: "Enter Valid Details" });
      // } else {
      //   const token = jwt.sign(
      //     { id: result[0].user_id },
      //     config.secert,
      //     { expiresIn: 86400 },
      //     { algorithm: "RS256" }
      //   );
      //   res.status(200).send({ auth: true, token: token, result });
      // }
    }
  );
});

// USER AUTHENTICATION BY TOKEN
router.get("/", (req, res) => {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader.split(" ")[1];
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
        if (result) {
          const validPassword = bcrypt.compare(body.password, user.password);
        }
        res.status(200).send(result);
      }
    );
    connection.end();
  });
});

module.exports = router;
