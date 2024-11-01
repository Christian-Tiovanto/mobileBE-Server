import { NextFunction, Request, Response } from "express";
import { AttendanceService } from "../services/attendance.service";
import catchAsync from "../utils/catch-async";

const attendanceService = new AttendanceService();
export class AttendanceController {
  constructor() {}

  createAttendance() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const attendance = await attendanceService.createAttendance(req.body);
        res.status(201).json({
          status: "success",
          data: attendance,
        });
      }
    );
  }
}
