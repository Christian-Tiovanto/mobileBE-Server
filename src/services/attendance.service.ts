import { CreateAttendanceDto } from "../dtos/create-attendance.dto";
import Attendance from "../models/attendance.model";
import AppError from "../utils/appError";
import { ClassroomService } from "./classroom.service";
import { UserService } from "./user.service";

const userService = new UserService();
const classroomService = new ClassroomService();
export class AttendanceService {
  constructor() {}

  async createAttendance(createAttendanceDto: CreateAttendanceDto) {
    const { user_id, class_id } = createAttendanceDto;
    const date = new Date();
    date.setHours(17, 0, 0, 0);
    createAttendanceDto.date = date;

    await this.findAttendanceByUserIdNClassIdNDate(
      user_id.toString(),
      class_id.toString(),
      date
    );
    await userService.findUserByUserId(user_id.toString());
    await classroomService.findClassroomById(
      createAttendanceDto.class_id.toString()
    );

    const attendance = await Attendance.create(createAttendanceDto);
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

    if (attendance)
      throw new AppError(
        "attendance already given, if you want to change the status, update the attendance",
        404
      );
    return Attendance;
  }
}
