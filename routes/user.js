const express = require("express");
const router = express.Router();
const jwt_user = require('../middleware/user_jwt.js');
const {
    handleVerifyUser,
    handleUserRegistration,
    handleUserLogin } = require("../controllers/user")

router.get('/', jwt_user, handleVerifyUser);
router.post('/register', handleUserRegistration);
router.post('/login', handleUserLogin);

module.exports = router;