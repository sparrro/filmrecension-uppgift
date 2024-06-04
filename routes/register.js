const route = require("express").Router();

const { registerUser, deleteThem } = require("../controllers/registerControllers");

route.post("/", registerUser);

module.exports = route;