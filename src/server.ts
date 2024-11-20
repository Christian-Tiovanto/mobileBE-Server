import { configDotenv } from "dotenv";
import { join } from "path";
import mongoose from "mongoose";
import app from "./app";
if ((process.env.NODE_ENV = "development")) {
  configDotenv({ path: join(__dirname, "..", ".env") });
  const PORT = process.env.PORT as any;
  mongoose
    .connect(`mongodb://localhost:27017/mobileBE?directConnection=true`)
    .then(async () => {
      console.log("DB Connection Successful");

      app.listen(PORT, "0.0.0.0", () => {
        console.log(`listening to port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
} else if ((process.env.NODE_ENV = "production")) {
  configDotenv({ path: join(__dirname, "..", ".env.prod") });
  const PORT = process.env.PORT as any;
  mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
      console.log("DB Connection Successful");

      app.listen(PORT, "0.0.0.0", () => {
        console.log(`listening to port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
