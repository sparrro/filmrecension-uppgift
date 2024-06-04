const route = require("express").Router();
const { authenticate } = require("../middlewares/authenticate");

const {
    addReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
} = require("../controllers/reviewControllers");

route.post("/", authenticate, addReview);

route.get("/", getAllReviews);

route.get("/:id", getReview);

route.put("/:id", authenticate, updateReview);

route.delete("/:id", authenticate, deleteReview);

module.exports = route;