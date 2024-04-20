import connectDB from "../db/connect.db.js";
import { STUDENT_TABLE } from "../utils/constants.js";

export const getStudent = async (req, res) => {
  try {
    const connection = await connectDB();

    connection.query(`SELECT * FROM ${STUDENT_TABLE} `, (error, results) => {
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
};

export const poststudent = async (req, res) => {
  try {
    const name = req.body.name;
    const connection = await connectDB();
    connection.query(`INSERT INTO ${STUDENT_TABLE} (name) VALUES (?)`, [name]);
    connection.end();
    res.send("Received your data!");
  } catch (error) {
    console.error("DB connecting error:", error);
    process.exit(1);
  }
};
