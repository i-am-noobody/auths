const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already registered with this email"
            })
        }
        const newUser = await User.create({
            name, email, password
        })
        const token = newUser.generateJWT()
        const cookieName = "userToken"
        res.status(201).cookie(cookieName, token).json({
            success: true,
            message: "User registered successfully",
            newUser,
            token
        })
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            })
        }
        const isPasswordMatched = await user.comparePassword(password)
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        const token = user.generateJWT()
        const cookieName = "userToken"
        return res.status(200).cookie(cookieName, token).json({
            success: true,
            message: "User Logged In successfully",
            user,
            token
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error during login"
        })
    }
}
exports.update = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(400).json({
                success: false,
                message: "User information is missing in the request"
            });
        }

        const user = await User.findById(req.user._id);
        const { name, email, password } = req.body;

        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }

        await user.save();
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.userDetails = async (req, res) => {
    try {
        const userdetails = await User.findById(req.user._id)
        if (!userdetails) {
            return res.status(404).json({
                success: fasle,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User details successfully fectched",
            userdetails
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Couldnot found user to delete"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}