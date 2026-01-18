import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: true,
  },
});

pool.connect()
  .then(() => console.log("Databasega ulandim"))
  .catch((err) =>
    console.error("Databasega ulanishda xatolik:", err)
  );
