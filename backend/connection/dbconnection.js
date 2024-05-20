const mongoose = require("mongoose")

const dbconnect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Database connected"))
        .catch(err => {
            console.log(`Eroor connecting to database :${err}`)
        })
}

module.exports = dbconnect