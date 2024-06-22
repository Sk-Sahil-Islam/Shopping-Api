const Review = require('../models/Review');

async function handleGetReviews(req, res) {
    try {
        let reviews = await Review.find({ product: req.params.productId });
        if(!reviews) {
            return res.status(400).json({
                success: false,
                msg: "Something went wrong"
            });
        }
        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews: reviews
        });

    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: error
        });
    }
}

async function handleUploadReview(req, res) {
    try {
        const review = await Review.create({
            product: req.params.productId,
            user: req.user.id,
            rating: req.body.rating,
            title: req.body.title,
            description: req.body.description,
            images: req.body.images,
            likes: req.body.likes
        });

        if(!review) {
            res.staus(400).json({
                success: false,
                msg: "Something went wrong"
            });
        }
        res.status(200).json({
            success: true,
            review: review
        });

    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: error
        });
    }
}

async function handleEditReview(req, res) {
    try {
        let review = await Review.findById(req.params.id);
        if(!review) {
            return res.status(400).json({
                success: false,
                msg: "Review doesn't exist"
            });
        }

        review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            review: review // no need to return you can just give a "Review updated successfully"
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: error
        });
    }
}

async function handleDeleteReview(req, res) {
    try {
        let review = await Review.findById(req.params.id);
        if(!review) {
            return res.status(400).json({
                success: false,
                msg: "Review doesn't exit"
            });
        }

        review = await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            msg: "Review deleted successfully"
        });
        
    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: error
        });
    }
}

module.exports = {
    handleGetReviews,
    handleUploadReview,
    handleEditReview,
    handleDeleteReview
}