const express = require('express');
const router = express.Router();
const jwt_user = require('../middleware/user_jwt');

const reviewController = require('../controllers/review');

router.get('/:productId', reviewController.handleGetReviews);
router.post('/:productId', jwt_user, reviewController.handleUploadReview);
router.put('/:id', reviewController.handleEditReview);
router.delete('/:id', reviewController.handleDeleteReview);

module.exports = router;