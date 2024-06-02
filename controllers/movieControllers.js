const { Movie } = require("../models/movie");
const { updateGenres } = require("../services/movieServices");

module.exports.addMovie = async (req, res) => {

    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).send("Movie added to database");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to add movie to database");
    }

}

module.exports.getAllMovies = async (req, res) => {

    try {
        const movies = await Movie.find();
        if (!movies) {
            return res.status(404).send("No movies found");
        }
        res.status(200).send(movies);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch movies");
    }

}

module.exports.getMovie = async (req, res) => {

    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send("Movie not found");
        }
        res.status(200).send(movie);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch movie");
    }

}

module.exports.updateMovie = async (req, res) => {

    /*
    body.genre may be either an array of strings or an object like this:
    {
        "in":[String],
        "out":[String]
    }
    If genre is an array, it overwrites the existing genre array
    If it is an object, it removes the genres in "out" from the existing array and adds the ones in "in"
    The object may contain either one of "in" and "out" or both
    */
    let updates;
    if (req.body.genre.out || req.body.genre.in) {
        const newGenres = await updateGenres(req.params.id, req.body.genre.out, req.body.genre.in);
        updates = {
            ...req.body,
            genre: newGenres
        }
    } else {
        updates = req.body;
    }

    const updateKeys = Object.keys(updates);
    const validUpdates = ["title", "director", "releaseYear", "genre"];
    const updateIsValid = updateKeys.every((key) => {
        return validUpdates.includes(key);
    });
    if (!updateIsValid) {
        return res.status(400).send("Invalid update keys");
    }
    
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, updates);
        if (!movie) {
            return res.status(404).send("Movie not found");
        }
        res.status(200).send("Movie updated");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update movie");
    }

}

module.exports.getMovieReviews = async (req, res) => {

}

module.exports.deleteMovie = async (req, res) => {

    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).send("Movie not found");
        }
        res.status(200).send(movie);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to delete movie");
    }

}