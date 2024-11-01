import { configDotenv } from "dotenv";
import { join } from "path";
import mongoose from "mongoose";
import app from "./app";
import { scheduleNotificationJob } from "./services/scheduler";

configDotenv({ path: join(__dirname, "..", ".env") });
const PORT = process.env.PORT;
mongoose
  .connect(
    `mongodb://${process.env.DB_ROOT_USER}:${process.env.DB_ROOT_PASSWORD}@${process.env.DB_HOST}:27019`
  )
  .then(() => {
    console.log("DB Connection Successful");
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
    scheduleNotificationJob();
  })
  .catch((error) => {
    console.log(error);
  });
