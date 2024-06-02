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

module.exports.deleteThem = async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("No such user found");
        }
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

}