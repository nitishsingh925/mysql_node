import express from "express";
import bodyParser from "body-parser";
import studentRoute from "./routes/student.route.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("register.html", { root: "public" });
});

app.use("/", studentRoute);

export { app };
