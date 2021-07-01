const express = require('express');
const router = express.Router({ mergeParams: true });
const connection = require('../connection');


//GET USER DETAILS BY ID ..
// router.get('/', (req, res) => {
//     console.log(req.params);
//     let id = req.params.id;
//     console.log(id);
//     let sql = 'SELECT * FROM users WHERE user_id = ?';
//     connection.query(sql, id, (error, result) => {
//         if (error) {
//             console.error(error);
//             res.status(500).send("message : bad request");
//         } else {
//             console.log(result);
//             res.status(200).send(result);
//         }
//     });
// });

//DELETE USER EXPENSES BY ID......
router.delete('/', (req, res) => {
    let id = req.params.id;
    let sql = 'DELETE FROM users_expenses where post_id = ?';
    connection.query(sql, id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("message : bad request");
        } else {
            console.log(result);
            res.status(200).send(result);
        }
    })

});


module.exports = router;