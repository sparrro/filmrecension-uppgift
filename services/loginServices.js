const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.comparePassword = async (password, hashed) => {
    return await bcrypt.compare(password, hashed);
}

module.exports.giveToken = (user) => {
    if (user.role == "admin") {
        return jwt.sign(
            {id: user._id, admin: true},
            process.env.JWT_SECRET,
            {expiresIn: "30min"}
        );
    } else {
        return jwt.sign(
            {id: user._id, admin: false},
            process.env.JWT_SECRET,
            {expiresIn: "30min"}
        );
    }
}