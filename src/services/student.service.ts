import { Types } from "mongoose";
import { CreateStudentDto } from "../dtos/create-student.dto";
import Student from "../models/student.model";
import AppError from "../utils/appError";

export class StudentService {
  constructor() {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const user = await Student.create(createStudentDto);
    await user.save();
    return user;
  }
  async findStudentById(userId: string) {
    const user = await Student.findOne({ user_id: userId }).select("+password");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }

  async getStudentsByClassId(classId: string) {
    const users = await Student.find({ class_id: classId });
    return users;
  }
}
