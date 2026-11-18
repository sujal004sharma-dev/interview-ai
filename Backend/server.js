require("dotenv").config();
const app = require("./src/app")
const ConnecToDb = require("./src/config/database")

ConnecToDb();

app.listen(3000, () => {
    console.log("Server is Running  on port 3000");
})
