

module.exports.authenticateAdmin = (req, res, next) => {
    if (req.user.admin) {
        next();
    } else {
        res.status(403).send("You are not an admin");
    }
}