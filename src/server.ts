import { configDotenv } from "dotenv";
import { join } from "path";
import mongoose from "mongoose";
import app from "./app";
configDotenv({ path: join(__dirname, "..", ".env") });
const PORT = process.env.PORT as any;
if (process.env.NODE_ENV == "development") {
  mongoose
    .connect(`mongodb://mongo:rahasia@localhost:27020/?directConnection=true`)
    .then(async () => {
      console.log("DB Connection Successful");
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`listening to port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
} else {
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
}
