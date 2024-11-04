import { Types } from "mongoose";
import { CreateStudentDto } from "../dtos/create-student.dto";
import AppError from "../utils/appError";
import Teacher from "../models/teacher.model";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";

export class TeacherService {
  constructor() {}

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    const user = await Teacher.create(createTeacherDto);
    await user.save();
    return user;
  }
  async findTeacherById(userId: string) {
    const user = await Teacher.findOne({ user_id: userId }).select("+password");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }

  async getTeachersByClassId(classId: string) {
    const users = await Teacher.find({ class_id: classId });
    return users;
  }
}
