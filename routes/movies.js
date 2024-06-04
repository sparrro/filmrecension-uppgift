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

route.post("/", authenticate, authenticateAdmin, addMovie);

route.get("/", getAllMovies);

route.get("/ratings", getAverageRatings);

route.get("/:id", getMovie);

route.put("/:id", authenticate, authenticateAdmin, updateMovie);

route.get("/:id/reviews", getMovieReviews);

route.delete("/:id", authenticate, authenticateAdmin, deleteMovie);

module.exports = route;