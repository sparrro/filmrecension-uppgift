const route = require("express").Router();

const {
    addReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
} = require("../controllers/reviewControllers")

//lägg till en ny recension
route.post("/", addReview);

//hämta en lista med alla recensioner
route.get("/", getAllReviews);

//hämta detaljer för en specifik recension
route.get("/:id", getReview);

//uppdatera en specifik recension
route.put("/:id", updateReview);

//ta bort en specifik recension
route.delete("/:id", deleteReview);

module.exports = route;