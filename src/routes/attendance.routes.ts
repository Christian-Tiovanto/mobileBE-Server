import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { AttendanceController } from "../controllers/attendance.controller";
import { CreateAttendanceDto } from "../dtos/create-attendance.dto";
import { AttendanceDateQuery } from "../queryJoi/attendance-date-query";
const attendanceRouter = express.Router();
const attendanceController = new AttendanceController();
attendanceRouter.post(
  "/",
  JoiValidationMiddleware({ classBodyType: CreateAttendanceDto }),
  attendanceController.createAttendance()
);

attendanceRouter.get(
  "/class/:class_id/tahun/:tahun_ajaran",
  JoiValidationMiddleware({ classQueryType: AttendanceDateQuery }),
  attendanceController.getAttendancesStatusForADate()
);
export default attendanceRouter;
