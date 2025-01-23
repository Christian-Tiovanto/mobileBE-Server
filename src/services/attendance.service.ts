import mongoose from "mongoose";
import { CreateAttendanceBulkDto } from "../dtos/create-attendance.dto";
import Attendance from "../models/attendance.model";
import AppError from "../utils/appError";
import { ClassroomService } from "./classroom.service";
import { StudentService } from "./student.service";
import { AttendanceStatus } from "../enums/attendance-status";

const studentService = new StudentService();
const classroomService = new ClassroomService();
export class AttendanceService {
  constructor() {}

  async createAttendanceBulk(createAttendanceBulkDto: CreateAttendanceBulkDto) {
    const date = new Date(createAttendanceBulkDto.data[0].date);
    date.setHours(17, 0, 0, 0);

    // createAttendanceBulkDto.date = date;
    for (const attendanceDto of createAttendanceBulkDto.data) {
      await this.findAttendanceByUserIdNClassIdNDate(
        attendanceDto.user_id.toString(),
        attendanceDto.class_id.toString(),
        date
      );
      await studentService.findStudentById(attendanceDto.user_id.toString());
      await classroomService.findClassroomById(
        attendanceDto.class_id.toString()
      );
      attendanceDto.date = date;
    }
    const attendance = await Attendance.insertMany(
      createAttendanceBulkDto.data
    );
    return attendance;
  }

  private async findAttendanceByUserIdNClassIdNDate(
    userId: string,
    classId: string,
    date: Date
  ) {
    const attendance = await Attendance.findOne({
      user_id: userId,
      class_id: classId,
      date,
    });

    if (attendance) throw new AppError("attendance already given", 404);
    return Attendance;
  }

  async getAttendancesStatusForADate(
    classId: string,
    tahunAjaran: string,
    date: Date
  ) {
    date.setHours(17, 0, 0, 0);
    const attendances = await Attendance.aggregate([
      {
        $match: {
          class_id: classId,
          tahun_ajaran: tahunAjaran,
          date: {
            $eq: date,
          },
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $addFields: {
          status: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return attendances;
  }

  async getAttendanceByClassIdNTahun(classId: string, tahunAjaran: string) {
    const attendances = await Attendance.find({
      class_id: classId,
      tahun_ajaran: tahunAjaran,
    });
    return attendances;
  }

  async getStudentAttendanceCount(
    userId: string,
    classId: string,
    tahunAjaran: string,
    status: AttendanceStatus
  ) {
    const attendanceCount = await Attendance.countDocuments({
      user_id: new mongoose.Types.ObjectId(userId),
      class_id: classId,
      tahun_ajaran: tahunAjaran,
      status,
    });
    return attendanceCount;
  }
  async getStudentAttendanceCountById(
    userId: string,
    status: AttendanceStatus
  ) {
    const student = await studentService.findStudentById(userId);
    const attendanceCount = await Attendance.countDocuments({
      user_id: new mongoose.Types.ObjectId(userId),
      class_id: student.class_id,
      tahun_ajaran: "2023",
      status,
    });
    return attendanceCount;
  }

  async getAttendanceByStudentId(studentId: string) {
    const attendances = await Attendance.find({ user_id: studentId });
    return attendances;
  }
}
