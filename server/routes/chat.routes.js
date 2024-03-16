const express = require("express");
const {
  createChat,
  addChatTable,
  getAllChatsByUser,
  deleteTheChatNames,
  getChatItems
} = require("../controllers/chat.controller");
const router = express.Router();

router.post("/createchat", createChat);
router.post("/addname", addChatTable);
router.post("/getallchats", getAllChatsByUser);
router.post("/deletechat", deleteTheChatNames);
router.post("/getchatbyname",getChatItems)
module.exports = router;
