const { Review } = require("../models/review");
const { alreadyReviewed, checkAuthor } = require("../services/reviewServices");

module.exports.addReview = async (req, res) => {

    if (alreadyReviewed(req.body.movieId, req.user.id) == true) {
        return res.status(400).send("You've already reviewed that one!")
    }

    try {
        const review = new Review(req.body);
        review.userId = req.user.id;
        await review.save();
        res.status(201).send(review);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to add review");
    }

}

module.exports.getAllReviews = async (req, res) => {

    try {
        const reviews = await Review.find();
        if (!reviews) {
            return res.status(404).send("No reviews found");
        }
        res.status(200).send(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch reviews");
    }

}

module.exports.getReview = async (req, res) => {

    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).send("Review not found");
        }
        res.status(200).send(review);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch review");
    }

}

module.exports.updateReview = async (req, res) => { //params id

    if (checkAuthor(req.params.id, req.user.id) == false && req.user.admin == false) {
        return res.status(403).send("You are neither an admin not the author of this review");
    }

    const updateKeys = Object.keys(req.body);
    const validUpdates = ["rating", "comment"];
    const updateIsValid = updateKeys.every((key) => {
        return validUpdates.includes(key);
    });
    if (!updateIsValid) {
        return res.status(400).send("Invalid update keys");
    }

    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body);
        if (!review) {
            return res.status(404).send("Review not found");
        }
        res.status(200).send(review);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update review");
    }

}

module.exports.deleteReview = async (req, res) => {

    if (checkAuthor(req.params.id, req.user.id) == false && req.user.admin == false) {
        return res.status(403).send("You are neither an admin not the author of this review");
    }

    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).send("Review not found");
        }
        res.status(200).send(review);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to delete review");
    }

}