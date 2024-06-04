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

module.exports.ratingsPipeline = [
    {
        $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "movieId",
            as: "reviews"
        }
    },
    {
        $unwind: {
            path: "$reviews",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $group: {
            _id: "$_id",
            title: { $first: "$title" },
            director: { $first: "$director" },
            releaseYear: { $first: "$releaseYear" },
            averageRating: { $avg: "$reviews.rating" },
            reviewCount: {
                $sum: {
                    $cond: [{
                        $ifNull: [
                            "$reviews._id",
                            false
                        ]
                    }, 1, 0]
                }
            }
        }
    },
    {
        $project: {
            _id: 0,
            movieId: "$_id",
            title: 1,
            director: 1,
            releaseYear: 1,
            averageRating: {
                $ifNull: ["$averageRating", 0]
            },
            reviewCount: 1
        }
    }
];