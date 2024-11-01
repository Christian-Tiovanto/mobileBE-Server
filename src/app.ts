import express from "express";
import userRouter from "./routes/user.routes";
import { globalErrorHandler } from "./controllers/error.controller";
import medicubeRouter from "./routes/medicube.routes";
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/medicube", medicubeRouter);

app.use(globalErrorHandler);
export default app;
