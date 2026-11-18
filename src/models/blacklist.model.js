const mongoose = require("mongoose");


const BlacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to be added to the Blacklist"]
    },
}, {
    timestamps: true
})

const TokenBlacklistModel=mongoose.model("blacklisttoken",BlacklistTokenSchema)

module.exports=TokenBlacklistModel