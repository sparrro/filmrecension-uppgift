const { User } = require("../models/user");
const { hashPassword } = require("../services/registerServices")

module.exports.registerUser = async (req, res) => {

    try {
        const user = new User(req.body);
        user.password = await hashPassword(user.password);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

}