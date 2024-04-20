import express from "express";
import connectDB from "./db/connect.db.js";
import { PORT, STUDENT_TABLE } from "./utils/constants.js";
import bodyParser from "body-parser";

const app = express();
const connection = await connectDB();
app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("register.html", { root: "public" });
});

app.post("/", (req, res) => {
  // console.log(req.body);
  const name = req.body.name;

  connection.query(`INSERT INTO ${STUDENT_TABLE} (name) VALUES (?)`, [name]);

  console.log(name);
  res.send("Received your data!"); // Responding to the POST request
});

// Handle GET requests to retrieve data
app.get("/data", async (req, res) => {
  try {
    const connection = await connectDB();

    // Use the connection to query the database
    connection.query(`SELECT * FROM ${STUDENT_TABLE} `, (error, results) => {
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
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port: ${PORT}`);
    });
  } catch (err) {
    console.log("Connection error:", err);
  }
};

startServer();
