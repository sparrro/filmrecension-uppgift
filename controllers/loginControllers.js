const { User } = require("../models/user");
const { comparePassword, giveToken } = require("../services/loginServices")

module.exports.logIn = async (req, res) => {

    try {
        let user;
        
        if (req.body.username) {
            user = await User.findOne({username: req.body.username});
        } else if (req.body.email) {
            user = await User.findOne({email: req.body.email});
        }

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (await comparePassword(req.body.password, user.password)) {
            const token = giveToken(user);
            res.status(200).json({message: "Logged in succesfully", token: token})
        } else {
            res.status(403).send("Incorrect login credentials");
        }
    } catch (error) {
        console.error(error);
        res.status(500);
    }

}