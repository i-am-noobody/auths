const express = require("express")
const { register, login, update, userDetails, deleteUser } = require("../controllers/userController")
const isUserAuthenticated = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/signup", register)
router.post("/login", login)
router.get('/details', isUserAuthenticated, (req, res) => {
    res.json({
        success: true,
        message: "User profile fetched successfully",
        user: req.user
    });
});
router.put("/update/:id", isUserAuthenticated, update)
router.delete("/delete", isUserAuthenticated, deleteUser)

module.exports = router