import { configDotenv } from "dotenv";
import { join } from "path";
import mongoose from "mongoose";
import app from "./app";
import { createServer } from "node:https";
const process = require("process");
configDotenv({ path: join(__dirname, "..", ".env") });
const PORT = process.env.PORT;
mongoose
  .connect(`mongodb://localhost:27017/mobileBE`)
  .then(async () => {
    console.log("DB Connection Successful");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
