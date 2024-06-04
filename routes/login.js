const route = require("express").Router();

const { logIn } = require("../controllers/loginControllers");

route.post("/", logIn);

module.exports = route;