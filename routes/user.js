const express = require("express");
const router = express.Router();
const { handleVerifyUser } = require("../controllers/user")

router.get('/', handleVerifyUser);

module.exports = router;