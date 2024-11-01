import express from "express";
import { JoiValidatoinMiddleware } from "../middlewares/joi-validation.middleware";
import { AttendanceController } from "../controllers/attendance.controller";
import { CreateAttendanceDto } from "../dtos/create-attendance.dto";
const attendanceRouter = express.Router();
const attendanceController = new AttendanceController();
attendanceRouter.post(
  "/",
  JoiValidatoinMiddleware(CreateAttendanceDto),
  attendanceController.createAttendance()
);
export default attendanceRouter;
