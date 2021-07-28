const { response } = require("express");
const express = require("express");
const router = express.Router({
  mergeParams: true,
});
const connection = require("../connection");
// const authenticateJWT = require("../verifyToken");

// router.use(authenticateJWT);
router.put("/", (req, res) => {
  console.log(req.id);
  let id = req.body.id;
  let userDetails = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };
  console.log(userDetails);
  let sql = "UPDATE  users SET ? WHERE user_id ?";
  connection.query(sql, [userDetails, id], (error, result) => {
    if (error) throw error;
    else {
      let data = {
        status: "200",
        data: result,
        massage: "update user data",
      };
      res.status(200).send(data);
    }
  });
});
module.exports = router;
