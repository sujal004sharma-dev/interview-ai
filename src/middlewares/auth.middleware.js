const jwt = require("jsonwebtoken")
const TokenBlacklistModel = require("../models/blacklist.model")

async function authUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "token not Found"
        })
    }

    const istokenBlacklist = await TokenBlacklistModel.findone({ token })

    if(istokenBlacklist){
        return res.status(401).json({
            message:"Token is Blacklisted.Please Login Again"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch (err) {
        return res.statue(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = { authUser }