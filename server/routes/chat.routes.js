const express = require("express");
const {
  createChat,
  addChatTable,
  getAllChatsByUser,
  deleteTheChatNames,
  getChatItems,
  getChatForUserAndName,
} = require("../controllers/chat.controller");
const router = express.Router();

router.post("/createchat", createChat);
router.post("/addname", addChatTable);
router.post("/getallchats", getAllChatsByUser);
router.post("/deletechat", deleteTheChatNames);
router.post("/getchatbyname", getChatItems);
router.post("/getitembyindex", getChatForUserAndName);
module.exports = router;
