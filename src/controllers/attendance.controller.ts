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

  getAttendancesStatusForADate() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const attendances =
          await attendanceService.getAttendancesStatusForADate(
            req.params.class_id,
            req.params.tahun_ajaran,
            new Date(`${req.query.date}`)
          );
        return res.status(200).json({
          status: "success",
          data: attendances,
        });
      }
    );
  }

  getAttendanceByClassIdNTahun() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const attendances =
          await attendanceService.getAttendanceByClassIdNTahun(
            req.params.class_id,
            req.params.tahun_ajaran
          );
        return res.status(200).json({
          status: "success",
          data: attendances,
        });
      }
    );
  }
}
