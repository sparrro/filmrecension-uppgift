const route = require("express").Router();

const {
    addMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    getMovieReviews,
    deleteMovie
} = require("../controllers/movieControllers")

//lägg till en ny film
route.post("/", addMovie);

//hämta en lista med alla filmer
route.get("/", getAllMovies);

//hämta detaljer för en specifik film
route.get("/:id", getMovie);

//uppdatera en specifik film
route.put("/:id", updateMovie);

//hämta alla recensioner för en specifik film
route.get("/:id/reviews", getMovieReviews);

//ta bort en specifik film
route.delete("/:id", deleteMovie);

module.exports = route;