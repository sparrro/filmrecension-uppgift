const { Review } = require("../models/review");

module.exports.alreadyReviewed = async (movieId, userId) => {
    const review = await Review.findOne({userId: userId, movieId: movieId});
    if (review) {
        return true;
    } else {
        return false;
    }
}

module.exports.checkAuthor = async (reviewId, userId) => {
    const review = await Review.findById(reviewId);
    if (review.userId == userId) {
        return true;
    } else {
        return false;
    }
}