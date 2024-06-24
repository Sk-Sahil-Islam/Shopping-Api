const Review = require('../models/Review');
const Product = require('../models/Product');

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
            msg: error.message
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
            return res.staus(400).json({
                success: false,
                msg: "Something went wrong"
            });
        }
        const product = await Product.findById(req.params.productId);
        if(!product) {
            return res.staus(400).json({
                success: false,
                msg: "Something went wrong"
            });
        }
        const totalRating = product.rating * product.totalRatings + review.rating;
        product.rating = (totalRating)/(product.totalRatings + 1);
        product.totalRatings += 1;

        await product.save();

        res.status(200).json({
            success: true,
            review: review
        });

    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: error.message
        });
    }
}

async function handleEditReview(req, res) {
    try {
        let review = await Review.findById(req.params.reviewId);
        
        if(!review) {
            return res.status(400).json({
                success: false,
                msg: "Review doesn't exist"
            });
        }

        const product = await Product.findById(req.query.productId);
        if(!product) {
            return res.staus(400).json({
                success: false,
                msg: "Something went wrong"
            });
        }
        if(req.body.rating) {
            let currentTotalRating = product.rating * product.totalRatings - review.rating + req.body.rating;
            product.rating = (currentTotalRating)/(product.totalRatings);

            await product.save();
        }
    
        review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {
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
            msg: error.message
        });
    }
}

async function handleDeleteReview(req, res) {
    try {
        let review = await Review.findById(req.query.reviewId);
        if(!review) {
            return res.status(400).json({
                success: false,
                msg: "Review doesn't exit"
            });
        }

        const product = await Product.findById(req.query.productId);
        if(!product) {
            return res.staus(400).json({
                success: false,
                msg: "Something went wrong"
            });
        }
        const totalRating = product.rating * product.totalRatings - review.rating;
        if(product.totalRatings === 1) {
            product.rating = 0;
        } else {
            product.rating = (totalRating)/(product.totalRatings - 1);
        }
        product.totalRatings -= 1;
        
        await product.save();
    
        review = await Review.findByIdAndDelete(req.query.reviewId);

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

async function handleAddComment(req, res) {
    try {
        let review = await Review.findById(req.params.reviewId);
        if(!review) {
            res.status(400).json({
                success: true,
                msg: "Review doesn't exist"
            });
        }
        const { comment } = req.body
        const newComment = {
            userId: req.user.id,
            name: req.user.userName,
            comment: comment
        }
        review.comments.push(newComment);
        await review.save();
    
        res.status(200).json({
            success: true,
            review: review
        });    
    } catch (error) {
        return res.status(404).json({
            success: false,
            msg: error.message
        });
    }
}

async function handleDeleteComment(req, res) {
    try {  
        let review = await Review.findById(req.query.reviewId);
        if (!review) {
            return res.status(400).json({
                success: false,
                msg: "Review doesn't exist"
            });
        }

        const commentIndex = review.comments.findIndex(comment => comment.id.toString() === req.query.commentId);

        if(commentIndex === -1) {
            return res.status(404).json({
                success: false,
                msg: "Comment not found"
            });
        }

        review.comments.splice(commentIndex, 1);
        await review.save();

        res.status(200).json({
            success: true,
            review: review
        });
    } catch (error) {
        return res.status(404).json({
            status: false,
            msg: error.message
        })
    }
    

}

module.exports = {
    handleGetReviews,
    handleUploadReview,
    handleEditReview,
    handleDeleteReview,
    handleAddComment,
    handleDeleteComment
}