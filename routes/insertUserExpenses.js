const express = require("express");
const router = express.Router();
const connection = require("../connection");
const authenticateJWT = require("../verifyToken");

// INSERT USER EXPENSES INTO DATABASE ..........
router.use(authenticateJWT);
router.post("/", (request, response) => {
  userExpenses = {
    post_id: null,
    category: request.body.category,
    price: request.body.price,
    date: request.body.date,
    discription: request.body.discription,
    user_id: request.id,
  };
  console.log(userExpenses);
  let sql = "INSERT INTO users_expenses SET ? ";
  connection.query(sql, userExpenses, (error, result) => {
    if (error) {
      throw error;
    } else {
      response.status(200).send(result);
      console.log(result);
    }
  });
});

module.exports = router;
