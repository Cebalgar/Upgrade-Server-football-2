const express = require("express");
const router = express.Router();

const {registerUser,loginUser,logoutUser} = require("../controllers/user.controller");
const { isAuth } = require("../../middlewares/auth.middleware");




router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/logout",[isAuth], logoutUser);


module.exports = router;