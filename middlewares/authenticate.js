const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {

    const authorization = req.headers["authorization"];
    const token = authorization && authorization.split(" ")[1];

    if (!token) {
        return res.status(401).send("No user token recieved");
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            console.error(error);
            return res.status(401).send("User token could not be authenticated");
        }
        req.user = user;
        next();
    });

}