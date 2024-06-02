const route = require("express").Router();

const { registerUser, deleteThem } = require("../controllers/registerControllers")

//registrera en ny användare
route.post("/", registerUser);

route.delete("/:id", deleteThem);

module.exports = route;