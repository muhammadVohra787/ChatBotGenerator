const express = require("express");
const router = express.Router();

const {checkTokenValid} = require("../controllers/user.token.controller")

router.post("/verifyToken",checkTokenValid);

module.exports=router