import { PORT } from "./utils/constants.js";
import { app } from "./app.js";

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
