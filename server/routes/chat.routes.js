const express = require("express");
const { createChat, addChatTable, getAllChatsByUser } = require("../controllers/chat.controller");
const router = express.Router();

router.post("/createchat",createChat)
router.post("/addname", addChatTable)
router.post("/getallchats",getAllChatsByUser)

module.exports = router;    