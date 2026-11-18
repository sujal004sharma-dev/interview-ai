const userModel = require("../models/user.models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const TokenBlacklistModel = require("../models/blacklist.model");


/**
 * @name Register user Controller
 * @description register a user expect a username,email and password from the User
 * @access Public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username emial password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already Exist with this username and email"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const User = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: User._id, username: User.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered Succesfully",
        User: {
            id: User._id,
            username: User.username,
            email: User.email
        }
    })
}

/**
 * @name Login user Controller
 * @description Handles the login of the user
 * @access Public
 */
async function loginUserController(req, res) {
    const { email, password } = req.body;

    const User = await userModel.findOne({ email });

    if (!User) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, User.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Email or Pasword"
        })
    }

    const token = jwt.sign(
        { id: User._id, username: User.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User Logged in Succesfully",
        User: {
            id: User._id,
            username: User.username,
            email: User.email
        }
    })
}


/**
 * @name Logout user Controller
 * @description Handles the logout of the user and blacklist the token 
 * @access Public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await TokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")
    res.status(200).json({
        message: "User Logged out Succesfully"
    })

}

/**
 * @name Get user info Controller
 * @description Handles the the get request of info of the user 
 * @access Public
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User details Fetched Succesfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }

    })

}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}