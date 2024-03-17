const express = require("express");
const {
  createChat,
  addChatTable,
  getAllChatsByUser,
  deleteTheChatNames,
  getChatItems,getChatOnebyOneController
} = require("../controllers/chat.controller");
const router = express.Router();

router.post("/createchat", createChat);
router.post("/addname", addChatTable);
router.post("/getallchats", getAllChatsByUser);
router.post("/deletechat", deleteTheChatNames);
router.post("/getchatbyname",getChatItems)
router.post("/getitembyindex",getChatOnebyOneController)
module.exports = router;
