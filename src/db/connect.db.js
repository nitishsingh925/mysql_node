import mysql from "mysql";
import { DATABASE, HOST, PASSWORD, USER } from "../utils/constants.js";

const connectDB = async () => {
  try {
    const connection = mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      database: DATABASE,
    });

    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to database:", err.message);
        process.exit(1);
      }
      console.log("Connected to MySQL database!");
    });

    return connection;
  } catch (error) {
    console.error("DB connecting error:", error);
    process.exit(1);
  }
};

export default connectDB;
