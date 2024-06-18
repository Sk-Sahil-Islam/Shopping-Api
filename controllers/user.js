const User = require("../models/User");

async function handleVerifyUser(req, res, next) {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({
            status: true,
            user: user
        })
    } catch (err) {
        console.log(err.message);
        
        res.status(500).json({
            status: false,
            msg: "Server error"
        });
        next();
    }
}

module.exports = {
    handleVerifyUser
,
    
}