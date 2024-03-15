// Make an env file for this to work!
const { Pool } = require("pg");
 
console.log(process.env.STAGE);
const pool = new Pool({
  ...(process.env.STAGE === "PRODUCTION"
    ? {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      }
    : {
        connectionString: process.env.POSTGRES_CONNECTION_URI,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL database:", err);
  } else {
    console.log("Connected to PostgreSQL database");
  }
});

module.exports = pool;
