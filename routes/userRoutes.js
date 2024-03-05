const express = require("express");
const {registerUser, loginUser} = require("../controllers/userControllers")

const { resetPassword, forgetPasswordRequest, checkAuth } = require("../services/common");
const { getBlogs } = require("../controllers/blogControllers");

const router = express.Router();



router.post("/sign-up",registerUser);
router.post("/login",loginUser);
router.post("/forgot",forgetPasswordRequest)
router.get('/posts',getBlogs)

router.get("/forgot/:id/:token",checkAuth)


router.post("/reset/:id/:token", resetPassword)
    


module.exports = router