const route = require("express").Router();

const { logIn } = require("../controllers/loginControllers")

//logga in en användare
route.post("/", logIn);

module.exports = route;