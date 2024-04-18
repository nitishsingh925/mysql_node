import express from "express";
// import mysql from "mysql";
import connectDB from "./db/connect.db.js";
import { PORT } from "./utils/constants.js";

const app = express();

// Define a route to fetch data from MySQL

app.get("/data", async (req, res) => {
  try {
    const connection = await connectDB();

    // Use the connection to query the database
    connection.query("SELECT * FROM student", (error, results) => {
      // Release the connection
      connection.end();

      if (error) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
    });
  } catch (err) {
    console.log("Error connecting to database:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(` ⚙️  Server is running at port : ${PORT}`);
    });
  } catch (err) {
    console.log("connection error", err);
  }
};

startServer();
