import express from "express";
import studentRouter from "./routes/student.routes";
import { globalErrorHandler } from "./controllers/error.controller";
import classroomRouter from "./routes/classroom.routes";
import attendanceRouter from "./routes/attendance.routes";
import gradeRouter from "./routes/grade.routes";
import teacherRouter from "./routes/teacher.router";
const app = express();
app.use(express.json());
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/classroom", classroomRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/grade", gradeRouter);

app.use(globalErrorHandler);
export default app;
