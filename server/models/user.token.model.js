const db = require("../db");
const cron = require("node-cron");
const createTokenTable = ` CREATE TABLE IF NOT EXISTS reset_password_codes (
    id SERIAL PRIMARY KEY,
    token VARCHAR(10) NOT NULL,
    expiry TIMESTAMP NOT NULL,
    email TEXT NOT NULL,
    used BOOLEAN DEFAULT FALSE
 );
`;

db.query(createTokenTable)
  .then(() => console.log("Token table created successfully"))
  .catch((error) => console.error("Error creating token table:", error));

class Token {
  constructor(token, expiry, email) {
    this.token = token;
    this.expiry = expiry;
    this.email = email;
  }

  static async createToken(email) {
    try {
      const token = generateRandomCode();
      const expiry = new Date(new Date().getTime() + 20 * 60000);
      const preQuery = `Delete From reset_password_codes where email = $1`
      await db.query(preQuery,[email])
      const query = `INSERT INTO reset_password_codes (token, expiry, email) VALUES ($1, $2, $3)`;
      const result = await db.query(query, [token, expiry, email]);

      console.log("Token created successfully", result);
      return token;
    } catch (error) {
      console.error("Error creating token:", error);
    }
  }
  static async checkToken(email, token) {
    try {
      const query = `SELECT * FROM reset_password_codes WHERE email = $1 AND token = $2 AND expiry > NOW()`;
      const result = await db.query(query, [email, token]);
      if (result.rows.length > 0) {
        this.cleanOutToken(token,email)
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Error checking token: ", err);
      return false; 
    }
  }

  static async cleanOutToken(token, email) {
    try {
      const query = `DELETE FROM reset_password_codes WHERE token = $1 AND email = $2`;
      await db.query(query, [token, email]);
      console.log("Token cleaned out successfully");
    } catch (error) {
      console.error("Error cleaning out token:", error);
    }
  }
}
const cleanExpiredTokens = async () => {
  try {
    const query = `DELETE FROM reset_password_codes WHERE expiry < NOW()`;
    await db.query(query);
    console.log("Expired tokens cleaned out successfully");
  } catch (error) {
    console.error("Error cleaning out expired tokens:", error);
  }
};
function generateRandomCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 7; i++) {
    const index = Math.floor(Math.random() * characters.length);
    code += characters[index];
  }
  return code;
}

cron.schedule("0 0 * * *", cleanExpiredTokens);
module.exports = Token;
