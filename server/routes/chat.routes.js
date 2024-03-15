const express = require("express");
const {
  createChat,
  addChatTable,
  getAllChatsByUser,
  deleteTheChatNamesAndChats,
} = require("../controllers/chat.controller");
const router = express.Router();

router.post("/createchat", createChat);
router.post("/addname", addChatTable);
router.post("/getallchats", getAllChatsByUser);
router.post("/deletechat", deleteTheChatNamesAndChats);
module.exports = router;
