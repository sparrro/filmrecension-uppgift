const route = require("express").Router();

const {authenticate} = require("../middlewares/authenticate")
const {authenticateAdmin} = require("../middlewares/adminAuth")

const {
    addMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    getMovieReviews,
    deleteMovie
} = require("../controllers/movieControllers")


route.get("/test", authenticate, authenticateAdmin, (req, res) => {
    return res.status(200).json(req.user)
})


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