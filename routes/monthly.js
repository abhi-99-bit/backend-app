const express = require("express");
const router = express.Router({
    mergeParams: true,
});
const connection = require("../connection");
const authenticateJWT = require('../verifyToken')

// GET USER EXPENESES FROM DATABASE FOR CURRENT USER (BY USING ID)..........
router.use(authenticateJWT);
router.get("/", (req, res) => {
    let user_id = req.id;
    console.log(user_id);
    let sql =
        "SELECT SUM(price) AS monthly_total FROM users_expenses WHERE MONTH(date) = MONTH(CURRENT_DATE())AND YEAR(date) = YEAR(CURRENT_DATE()) and user_id = ?";
    connection.query(sql, user_id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("There is error in your query");
        } else {
            let user_data = {
                error: false,
                data: result,
                msg: "Get Today expenses count"
            }
            res.status(200).send(user_data);
        }
    });
});

module.exports = router;
