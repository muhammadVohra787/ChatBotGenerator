const Chat = require("../models/chat.model");

const createChat = async (req, res) => {
  const dataArray = req.body;
  const chatName = dataArray[0].chatName;
  const userId = dataArray[0].userId;
  const dataRowsToProcess = dataArray.slice(1);

  try {
    const chatFound = await Chat.findByName(chatName, userId);
    if (chatFound) {
      await Chat.removeAllByChatName(chatName, userId);
      console.log("Removed pre-existing data");
    }
    for (const element of dataRowsToProcess) {
      const optionsExist = element.options ? element.options : "false";
      const type = element.type;
      const mainLabel = element.mainLabel;
      const mainQuestion = element.mainQuestion;
      const endChat = element.endChat ? element.endChat : "";
      const response = element.response ? element.response : "";
      await Chat.create(
        userId,
        chatName,
        type,
        mainLabel,
        mainQuestion,
        endChat,
        optionsExist,
        response
      );
    }
    res
      .status(201)
      .json({ message: "Chat creation was successful", type: true });
    console.log("Chat created successfully on the server");
  } catch (err) {
    console.error("Error creating chat:", err);
    res.status(500).json({ message: "Internal server error", type: false });
  }
};

const addChatTable = async (req, res) => {
  const { chatName, userId } = req.body;
  try {
    const chatFound = await Chat.findByName(chatName, userId);
    if (!chatFound) {
      await Chat.createName(chatName, userId);
      console.log("chat created");
      res
        .status(201)
        .json({ message: "Chat Name creation was successful", type: true });
    } else {
      res.status(400).json({ message: "Name Already Exists", type: false });
    }
  } catch (err) {
    console.error("Error creating chatname:", err);
    res.status(500).json({ message: "Internal server error", type: false });
  }
};

const getChatByNameAndId = async (req, res) => {
  const { chatName, userId } = req.body;
  try {
    const chatFound = await Chat.findByName(chatName, userId);
    if (chatFound) {
      res
        .status(200)
        .json({ message: "Successful", type: true, data: chatFound });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not find the chat or username", type: false });
    console.log("Error GETTING chat by name and user ID," + err);
  }
};
const getAllChatsByUser = async (req, res) => {
  //const userId = req.params.id;
  const { userId } = req.body;
  try {
    const chatFound = await Chat.findallChatsByUserId(userId);
    if (chatFound) {
      res
        .status(200)
        .json({ message: "Successful", type: true, data: chatFound });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Could not find the chat or username", type: false });
    console.log("Error GETTING chat by name and user ID," + err);
  }
};

const deleteTheChatNames = async (req, res) => {
  const { chatName, userId } = req.body;
  console.log(req.body);
  try {
    const result = await Chat.deleteChatName(chatName, userId);

    res
      .status(200)
      .json({ message: "Successful", type: true, data: "Chat Deleted" });
    console.log("Chat deleted");
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      type: true,
      data: "Chat Not Found",
    });
    console.log("Error deleting chats", error);
  }
};

const getChatItems = async (req, res) => {
  const { chatName, userId } = req.body;

  try {
    const result = await Chat.getChatItemsByNameID(userId, chatName);

    res.status(200).json({ message: "Successful", type: true, data: result });
  } catch (err) {
    res.status(500).json({ message: "Item not found", type: false });
  }
};

const getChatOnebyOneController = async (req, res) => {
  const { chatName, userId } = req.body;
  const finalArr = [];
  let index = 0;
  try {
    const result = await Chat.getChatOneByOne(chatName, userId);
    var checkLastIndex = 0;

    const lastIndex = result.length;
    result.map((value) => {
      checkLastIndex++;

      if (value.type == "TextQuestion") {
        index++;
        console.log(index, value.mainlabel, value.mainquestion);
        const ObjectForMessage = {
          id: value.mainlabel,
          message: value.mainquestion,
          trigger: result[index - 1]
            ? result[index - 1].mainlabel + "res"
            : false,
        };
        const ObjectForInput = {
          id: result[index - 1] ? result[index - 1].mainlabel + "res" : false,
          user: true,
          trigger: result[index] ? result[index].mainlabel : index + 1,
        };
        console.log(ObjectForInput);
        finalArr.push(ObjectForMessage);
        finalArr.push(ObjectForInput);
      } else if (value.type == "SingleSelect") {
        index++;
        const ObjectForMessage = {
          id: value.mainlabel,
          message: value.mainquestion,
          trigger: result[index]
            ? result[index].mainlabel.toLowerCase().replace(/ /g, "_") +
              " option"
            : false,
        };
        finalArr.push(ObjectForMessage);
        var objectList = [];
        var optionIndex = 0;
        var optionLength = value.options.length;
        console.log(optionLength);
        value.options.map((options) => {
          objectList.push({
            value: index,
            label: options.option,
            trigger: options.response.toLowerCase().replace(/ /g, "_") + " res",
          });
          var ResponseObject = {
            id: options.response.toLowerCase().replace(/ /g, "_") + " res",
            message: options.response,
            trigger: result[index].mainlabel,
          };
          finalArr.push(ResponseObject);
        });
        OptionObject = {
          id: result[index]
            ? result[index].mainlabel.toLowerCase().replace(/ /g, "_") +
              " option"
            : false,
          options: objectList,
        };
        finalArr.push(OptionObject);
      } else if (value.type == "TextMessage") {
        index++;
        const ObjectForMessage = {
          id: value.mainlabel,
          message: value.mainquestion,
          trigger: result[index] ? result[index].mainlabel : false,
        };
        finalArr.push(ObjectForMessage);
      }
      if (lastIndex === checkLastIndex) {
        const ObjectForMessage = {
          id: index + 1,
          message: "End of Chat",
          trigger: false,
        };
        finalArr.push(ObjectForMessage);
      }
    });
    res.status(200).json({ message: "Successful", type: true, data: finalArr });
  } catch (err) {
    res.status(500).json({ message: "Item not found", type: false });
  }
};
module.exports = {
  createChat,
  addChatTable,
  getChatByNameAndId,
  getAllChatsByUser,
  deleteTheChatNames,
  getChatItems,
  getChatOnebyOneController,
};
