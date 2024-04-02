const SaveChat = require("../models/chat.response.model");

const saveChat = async (req, res) => {
  const dataArray = req.body;

  const chatName = dataArray.chatName;
  const userId = dataArray.userId;
  const fullChatjsonb = JSON.stringify(dataArray.data);
  try {
    await SaveChat.saveChat(chatName, userId, fullChatjsonb);
    res.status(201).json({ message: "Chat responses were saved", type: true });
    console.log("Chat saved successfully on the server");
  } catch (err) {
    console.error("Error saving chat:", err);
    res.status(500).json({ message: "Internal server error", type: false });
  }
};

const getChats = async(req,res)=>{
  const dataArray = req.body;
  const userId = dataArray.userId;
  
  try {
    const result= await SaveChat.getChatById(userId);
    res.status(201).json({ message: "Chat responses were recieved", type: true, data:result });
    console.log("Chat recieved successfully from the server");
  } catch (err) {
    console.error("Error recieving chat:", err);
    res.status(500).json({ message: "Internal server error", type: false });
  }
}
module.exports = {
  saveChat,
  getChats
};
