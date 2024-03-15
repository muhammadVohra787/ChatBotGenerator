const express = require("express");
const router = express.Router();

const {createUser,signInUser, changePassword,updatePasswordLink} = require("../controllers/user.controller");

router.post("/createuser", createUser);
router.post("/login",signInUser)
router.post("/updatepassword",changePassword)
router.post("/sndlink",updatePasswordLink)
module.exports = router;

