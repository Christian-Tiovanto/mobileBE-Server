import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { AttendanceController } from "../controllers/attendance.controller";
import { CreateAttendanceDto } from "../dtos/create-attendance.dto";
const attendanceRouter = express.Router();
const attendanceController = new AttendanceController();
attendanceRouter.post(
  "/",
  JoiValidationMiddleware(CreateAttendanceDto),
  attendanceController.createAttendance()
);
export default attendanceRouter;
