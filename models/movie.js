const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,

    },
    genre: {
        type: [String],
        required: true
    }
});

module.exports.Movie = mongoose.model("Movie", movieSchema);