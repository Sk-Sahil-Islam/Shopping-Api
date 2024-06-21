const express = require('express');
const router = express.Router();
const jwt_user = require('../middleware/user_jwt.js');
const productController = require('../controllers/product')

router.get('/man', productController.handleGetManFashion);
router.post('/sell/product', jwt_user, productController.handleUploadProduct);

module.exports = router