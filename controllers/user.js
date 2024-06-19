const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function handleVerifyUser(req, res, next) {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({
            success: true,
            user: user
        })
    } catch (err) {
        console.log(err.message);
        
        res.status(500).json({
            success: false,
            msg: "Server error"
        });
        next();
    }
}

async function handleUserRegistration(req, res) {
    const { userName, email, password } = req.body;

    try {
        const userExist = await User.findOne({ email: email });

        if(userExist) {
            return res.status(409).json({
                success: false,
                msg: "User already exist"
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        let size = 200;
        const avatar = "https://gravatar.com/avatar/?s="+ size +"&d=retro";

        const user = await User.create({
            userName: userName,
            email: email,
            password: hashedPassword,
            avatar: avatar
        });


        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.jwtUserSecret, {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.status(200).json({
                success: true,
                token: token
            });
        });
    } catch (err) {
        console.log(err);
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if(!user) {
            return res.status(400).json({
                success: false,
                msg: "User, doesn't exist, please register"
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                msg: "Invalid password"
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        user = user.toObject();
        delete user.password;

        jwt.sign(payload, process.env.jwtUserSecret,{
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.status(200).json({
                success: true,
                msg: 'Login successful',
                token: token,
                user: user
            });
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
}

module.exports = {
    handleVerifyUser,
    handleUserRegistration,
    handleUserLogin
}