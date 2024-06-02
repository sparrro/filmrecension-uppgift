const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
    },
    comment: {
        type: String
    }
}, { timestamps: true });

module.exports.Review = mongoose.model("Review", reviewSchema);