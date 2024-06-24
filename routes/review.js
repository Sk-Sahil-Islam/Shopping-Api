const express = require('express');
const router = express.Router();
const jwt_user = require('../middleware/user_jwt');

const reviewController = require('../controllers/review');

router.get('/:productId', reviewController.handleGetReviews);
router.post('/:productId', jwt_user, reviewController.handleUploadReview);
router.put('/:reviewId', reviewController.handleEditReview);
router.delete('/delete', reviewController.handleDeleteReview);
router.put('/comment/:reviewId', jwt_user, reviewController.handleAddComment);
router.delete('/comment/delete', jwt_user, reviewController.handleDeleteComment);
 
module.exports = router;
