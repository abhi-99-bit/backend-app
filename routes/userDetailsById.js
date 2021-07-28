const express = require("express");
const router = express.Router({ mergeParams: true });
const connection = require("../connection");
const authenticateJWT = require("../verifyToken");

//GET USER DETAILS BY ID ..
router.use(authenticateJWT);
router.get("/", (req, res) => {
  let id = req.id;
  console.log(id);
  let sql = "SELECT * FROM users WHERE user_id = ?";
  connection.query(sql, id, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("message : bad request");
    } else {
      let data = {
        auth: true,
        data: result,
        status: "sucess",
      };
      console.log(data);
      res.status(200).send(data);
    }
  });
});

router.post("/", (req, res) => {});

module.exports = router;
