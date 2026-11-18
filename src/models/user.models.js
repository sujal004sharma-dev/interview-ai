const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "name already taken"],
        required: true
    },
    email: {
        type: String,
        unique: [true, "Account already exists"],
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("users", userschema)

module.exports = userModel