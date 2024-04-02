const express = require("express");
const {
  saveChat,
  getChats,
} = require("../controllers/chat.response.controller");

const router = express.Router();
router.post("/saveChat", saveChat);
router.post("/getsavedChatsById", getChats);

module.exports = router;
