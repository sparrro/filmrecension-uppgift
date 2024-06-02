const { Movie } = require("../models/movie");

module.exports.updateGenres = async (id, removals, additions) => {

    const movie = await Movie.findById(id);
    if (!movie) {
        return false;
    }
    let newGenres;
    if (removals) {
        newGenres = movie.genre.filter(genre => !removals.includes(genre));
        if (additions) {
            additions.forEach(addition => {
                newGenres.push(addition);
            });
        }
    } else {
        newGenres = movie.genre;
        if (additions) {
            additions.forEach(addition => {
                newGenres.push(addition);
            });
        }
    }
    return newGenres;

}