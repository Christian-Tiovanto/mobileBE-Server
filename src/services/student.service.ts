import { Types } from "mongoose";
import { CreateStudentDto } from "../dtos/create-student.dto";
import Student from "../models/student.model";
import AppError from "../utils/appError";
import { UpdateStudentDto } from "../dtos/update-student.dto";
import { ClassroomService } from "./classroom.service";

const classroomService = new ClassroomService();
export class StudentService {
  constructor() {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const user = await Student.create(createStudentDto);
    await user.save();
    return user;
  }
  async findStudentByUserId(userId: string) {
    const user = await Student.findOne({ user_id: userId }).select("+password");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }
  async findStudentById(id: string) {
    const user = await Student.findOne({ _id: id });
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }

  async getStudentsByClassId(classId: string) {
    const users = await Student.find({ class_id: classId });
    return users;
  }

  async updateStudentById(id: string, updateStudentDto: UpdateStudentDto) {
    const user = await this.findStudentById(id);
    if (updateStudentDto.class_id)
      await classroomService.findClassroomById(updateStudentDto.class_id);
    Object.assign(user, updateStudentDto);
    await user.save();
    return user;
  }
}
