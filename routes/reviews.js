const route = require("express").Router();
const { authenticate } = require("../middlewares/authenticate");

const {
    addReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
} = require("../controllers/reviewControllers")

//lägg till en ny recension - GJORT
route.post("/", authenticate, addReview);

//hämta en lista med alla recensioner - GJORT
route.get("/", getAllReviews);

//hämta detaljer för en specifik recension - GJORT
route.get("/:id", getReview);

//uppdatera en specifik recension - GJORT
route.put("/:id", authenticate, updateReview);

//ta bort en specifik recension - GJORT
route.delete("/:id", authenticate, deleteReview);

module.exports = route;