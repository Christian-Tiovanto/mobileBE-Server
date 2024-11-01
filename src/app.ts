import express from "express";
import userRouter from "./routes/user.routes";
import { globalErrorHandler } from "./controllers/error.controller";
import classroomRouter from "./routes/classroom.routes";
import attendanceRouter from "./routes/attendance.routes";
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/classroom", classroomRouter);
app.use("/api/v1/attendance", attendanceRouter);

app.use(globalErrorHandler);
export default app;
