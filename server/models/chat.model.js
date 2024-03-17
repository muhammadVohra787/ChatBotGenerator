const db = require("../db");
const createChatTable = `
  CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    chatName VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    mainLabel VARCHAR(255) NOT NULL,
    mainQuestion VARCHAR(255) NOT NULL,
    endChat VARCHAR(255),
    options JSONB,
    userResponse VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;
const createChatName = `
  CREATE TABLE IF NOT EXISTS chatnames (
    id SERIAL PRIMARY KEY,
    chatName VARCHAR(255) UNIQUE NOT NULL,
    userId VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;
db.query(createChatTable)
  .then(() => console.log("Chat table created successfully"))
  .catch((error) => console.error("Error creating Chat table:", error));

db.query(createChatName)
  .then(() => console.log("Chat Names table created successfully"))
  .catch((error) => console.error("Error creating Chat Names table:", error));

class Chat {
  constructor(userId, chatName, type, mainLabel, mainQuestion, endChat, options, userResponse) {
    this.chatName = chatName;
    this.type = type;
    this.mainLabel = mainLabel;
    this.mainQuestion = mainQuestion;
    this.endChat = endChat;
    this.options = options;
    this.userId = userId;
    this.userResponse = userResponse;
  }

  // Create a chat
  static async create(userId, chatName, type, mainLabel, mainQuestion, endChat, options, userResponse) {
    const query = `
      INSERT INTO chats (userId, chatName, type, mainLabel, mainQuestion, endChat, options, userResponse)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const values = [userId, chatName, type, mainLabel, mainQuestion, endChat, JSON.stringify(options), userResponse];
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  // Find chat by name and user ID
  static async findByName(chatName, userId) {
    const query = `
      SELECT * FROM chatnames WHERE chatname = $1 AND userid = $2;
    `;
    try {
      const result = await db.query(query, [chatName, userId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error finding chat by name and user ID:", error);
      throw error;
    }
  }

  // Remove all chats by chat name and user ID
  static async removeAllByChatName(chatName, userId) {
    const query = `
      DELETE FROM chats WHERE chatname = $1 AND userid = $2;
    `;
    try {
      await db.query(query, [chatName, userId]);
      return "Rows deleted";
    } catch (error) {
      console.error("Error removing all chats by chat name and user ID:", error);
      throw error;
    }
  }

  static async getChatOneByOne(chatName,userId,index){
    const query =`SELECT * FROM CHATS WHERE CHATNAME=$1 AND USERID=$2 OFFSET $3 LIMIT 1;
    `
    try{
      const res = await db.query(query,[chatName,userId,index])
      return res
    }catch(err){
      console.log("couldnt get the item", err)
      throw err
    }
  }
  // Delete chat name and associated chats by chat name and user ID
  static async deleteChatName(chatName, userId) {
    const queryRemovedChatName = `
      DELETE FROM chatnames WHERE chatname = $1 AND userid = $2;
    `;
    const queryRemoveChats = `
      DELETE FROM chats WHERE chatname = $1 AND userid = $2;
    `;
    try {
      await db.query(queryRemovedChatName, [chatName, userId]);
      await db.query(queryRemoveChats, [chatName, userId]);
    } catch (error) {
      console.error("Error deleting chat name and associated chats:", error);
      throw error;
    }
  }

  // Create chat name
  static async createName(chatName, userId) {
    try {
      const queryAddName = `INSERT INTO chatnames (chatName, userId) VALUES ($1, $2)`;
      await db.query(queryAddName, [chatName, userId]);
    } catch (error) {
      console.error("Error adding a new chat name:", error);
      throw error;
    }
  }

  // Find all chats by user ID
  static async findallChatsByUserId(userId) {
    try {
      const query = `SELECT * FROM chatnames WHERE userid = $1`;
      const result = await db.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error("Error finding all chats by user ID:", error);
      throw error;
    }
  }

  // Get chat items by chat name and user ID
  static async getChatItemsByNameID(userId, chatName) {
    const query = `SELECT * FROM chats WHERE chatname = $1 AND userid = $2`;
    try {
      const result = await db.query(query, [chatName, userId]);
      return result.rows;
    } catch (error) {
      console.error("Error getting chat items by chat name and user ID:", error);
      throw error;
    }
  }
}

module.exports = Chat;