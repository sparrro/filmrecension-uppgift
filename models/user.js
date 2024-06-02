const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Invalid email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    }
});

module.exports.User = mongoose.model("User", userSchema);