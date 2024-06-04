const route = require("express").Router();

const { authenticate } = require("../middlewares/authenticate");
const { authenticateAdmin } = require("../middlewares/adminAuth");

const {
    addMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    getMovieReviews,
    getAverageRatings,
    deleteMovie
} = require("../controllers/movieControllers");

//lägg till en ny film - GJORT
route.post("/", authenticate, authenticateAdmin, addMovie);

//hämta en lista med alla filmer - GJORT
route.get("/", getAllMovies);

//hämta en lista med alla filmer och deras genomsnittliga betyg - VG - SISTA GUBBHEN - PÅGÅENDE
route.get("/ratings", getAverageRatings);

//hämta detaljer för en specifik film - GJORT
route.get("/:id", getMovie);

//uppdatera en specifik film - GJORT
route.put("/:id", authenticate, authenticateAdmin, updateMovie);

//hämta alla recensioner för en specifik film - GJORT
route.get("/:id/reviews", getMovieReviews);

//ta bort en specifik film - GJORT
route.delete("/:id", authenticate, authenticateAdmin, deleteMovie);

module.exports = route;