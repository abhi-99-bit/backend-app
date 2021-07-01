const express = require("express");
const router = express.Router({
    mergeParams: true
});
const connection = require("../connection");

router.put('/', (request, response) => {
    console.log(request.body);
    console.log(request.params);
    let id = request.params.id;
    let updateData = {
        category: request.body.category,
        price: request.body.price,
        date: request.body.date,
        discription: request.body.discription,
    }
    console.log(updateData);
    
    let sql = 'UPDATE users_expenses SET ? WHERE post_id = ?';
    connection.query(sql, [updateData, id], (error, result) => {
        if (error) {
            console.error(error);
            response.status(500).send("There is error in your query");
        } else {
            response.status(200).send(result);
        }
    });

});

module.exports = router;