const express = require('express');
const router = express.Router();
const jwt_user = require('../middleware/user_jwt.js');
const productController = require('../controllers/product');

router.get('/products/:category', productController.handleGetFashion);
router.get('/myProducts', jwt_user, productController.handleGetMyProducts);

router.post('/products', jwt_user, productController.handleUploadProduct);
router.put('/products/:id', productController.handleEditProduct);
router.delete('/products/:id', productController.handleDeleteProduct);

module.exports = router