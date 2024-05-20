const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const isUserAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.userToken
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "User not authenticated"
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



module.exports = isUserAuthenticated