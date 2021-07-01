const jwt = require('jsonwebtoken');
const config = require("./config");

module.exports = (req, res, next) => {
    const autHeader = req.headers["authorization"];
    const token = autHeader && autHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, config.secert, (error, decoded) => {
            if (error)
                return res
                    .status(500)
                    .send({
                        auth: false,
                        message: "Failed to authenticate token"
                    });
            else {
                req.id = decoded.id;
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
}