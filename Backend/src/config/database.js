const mongoose = require("mongoose");

async function ConnecToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connection Succesfull");
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = ConnecToDb