import { configDotenv } from "dotenv";
import { join } from "path";
import mongoose from "mongoose";
import app from "./app";

configDotenv({ path: join(__dirname, "..", ".env") });
const PORT = process.env.PORT;
mongoose
  .connect(
    `mongodb://${process.env.DB_ROOT_USER}:${process.env.DB_ROOT_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}?directConnection=true`
  )
  .then(() => {
    console.log(
      `mongodb://${process.env.DB_ROOT_USER}:${process.env.DB_ROOT_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`
    );
    console.log("DB Connection Successful");
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
