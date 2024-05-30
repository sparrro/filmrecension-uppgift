const route = require("express").Router();

const { registerUser } = require("../controllers/registerControllers")

//registrera en ny användare
route.post("/", registerUser);

module.exports = route;