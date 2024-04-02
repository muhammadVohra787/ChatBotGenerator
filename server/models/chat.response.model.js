const db = require("../db");

const createSaveChat = `
  CREATE TABLE IF NOT EXISTS savedChats (
    id SERIAL PRIMARY KEY,
    chatName VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT NULL,
    fullChatjsonb JSONB,
    setSeen BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
 
db.query(createSaveChat)
  .then(() => console.log("Chat table created successfully"))
  .catch((error) => console.error("Error creating Chat table:", error));

class SaveChat {
  constructor(chatName, userId, fullChatjsonb) {
    this.chatName = chatName;
    this.userId = userId;
    this.fullChatjsonb = fullChatjsonb;
  }

  static async saveChat(chatName, userId, fullChatjsonb) {
    try {
      const query = `
        INSERT INTO savedChats (chatName, userId, fullChatjsonb)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const values = [chatName, userId, fullChatjsonb];
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  static async deleteSaveChat(chatName) {
    try {
      const query = `
        DELETE FROM savedChats
        WHERE chatName = $1;
      `;
      const values = [chatName];
      await db.query(query, values);
      console.log(`Chat '${chatName}' deleted successfully`);
    } catch (error) {
      console.error("Error deleting chat:", error);
      throw error;
    }
  }

  static async getChatByNameAndId(chatName,userId) {
    try {
      const query = `
        SELECT * FROM savedChats
        WHERE chatName = $1 and userId = $2;
      `;
      const values = [chatName,userId];
      const { rows } = await db.query(query, values);
      return rows;
    } catch (error) {
      console.error("Error retrieving chat by name:", error);
      throw error;
    }
  }
  static async getChatById(userId) {
    try {
      const query = `
        SELECT * FROM savedChats
        WHERE userId = $1;
      `;
      const values = [userId];
      const { rows } = await db.query(query, values);
      return rows;
    } catch (error) {
      console.error("Error retrieving chat by name:", error);
      throw error;
    }
  }

}

module.exports = SaveChat;
