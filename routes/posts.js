const express = require("express");
const router = express.Router({
    mergeParams: true,
});
const connection = require("../connection");
const authenticateJWT = require('../verifyToken')

// GET USER EXPENESES FROM DATABASE FOR CURRENT USER (BY USING ID)..........
router.use(authenticateJWT);
router.get("/", (req, res) => {
    // let user_id = parseInt(req.params.id);
    let user_id = req.id;
    console.log(user_id);
    let sql =
        "SELECT post_id, category, price , date , discription FROM users_expenses ue JOIN users u ON ue.user_id = u.user_id WHERE ue.user_id = ?";
    connection.query(sql, user_id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("There is error in your query");
        } else {
            res.status(200).send(result);
        }
    });
});

module.exports = router;
