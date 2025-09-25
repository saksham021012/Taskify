const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Db Connected Successfully"))
    .catch((error) => {
        console.log("DB Connection failed");
        console.error(error);
        process.exit(1);
    })
}