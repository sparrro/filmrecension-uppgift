const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    director: {
        type: String,
        required: true,
        trim: true
    },
    releaseYear: {
        type: Number,
        required: true,
        validate: [(year) => {
            const currentYear = new Date().getFullYear();
            return year <= currentYear;
        }, "Year must not be in the future"]
    },
    genre: {
        type: [String],
        required: true
    }
});

module.exports.Movie = mongoose.model("Movie", movieSchema);