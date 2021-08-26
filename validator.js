const { check } = require("express-validator");
const connection = require("./connection");

module.exports = {
  validateEmail: check("email")
    .isEmail()

    .withMessage("Invalid email")

    .custom((email) => {
      return new Promise((resolve, reject) => {
        connection.query(
          `SELECT * FROM users WHERE email = ?`,
          email,
          (err, res) => {
            if (err) {
              reject(new Error("Server Error"));
            }
            if (res.length > 0) {
              reject(new Error("E-mail already in use"));
            }

            resolve(true);
          }
        );
      });
    }),
};

// async (email) => {
//     var sql = " SELECT * FROM users WHERE email = ?";
//     const existingUser = await  connection.query(sql, email, (error, result) => {
//         console.log(result,"this validator call------------------");
//         if(error) throw error;
//         if(result == 0) return false;
//         else {
//             return true;
//         }
//     })

//     if (existingUser) {
//         throw new Error('Email already in use')
//     }

// }
