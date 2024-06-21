const express = require("express");
const router = express.Router();
const jwt_user = require('../middleware/user_jwt.js');
const userController = require("../controllers/user");

router.get('/', jwt_user, userController.handleVerifyUser);
router.post('/register', userController.handleUserRegistration);
router.post('/login', userController.handleUserLogin);

module.exports = router;