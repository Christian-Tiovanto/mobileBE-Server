import { LoginDto } from "../dtos/login.dto";
import Student, { StudentDocument } from "../models/student.model";
import AppError from "../utils/appError";
import * as jwt from "jsonwebtoken";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { ClassroomService } from "./classroom.service";
import Teacher from "../models/teacher.model";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";
import { TeacherService } from "./teacher.service";
const userService = new StudentService();
const teacherService = new TeacherService();
const classService = new ClassroomService();
export class AuthService {
  constructor() {}
  private signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  }

  async loginStudent(loginDto: LoginDto) {
    const { user_id, password } = loginDto;
    const user = await userService.findStudentById(user_id);
    await user.correctPassword(password, user.password);
    const token = await this.signToken(user.user_id);
    return { user, token };
  }
  async signUpStudent(createUserDto: CreateStudentDto) {
    const { user_id, class_id } = createUserDto;
    if (class_id) await classService.findClassroomById(class_id);
    const user = await Student.findOne({ user_id }).select("+password");
    if (user)
      throw new AppError("user_id already exist, use another user_id", 400);
    const newUser = await userService.createStudent(createUserDto);
    const token = await this.signToken(newUser.user_id);
    return { newUser, token };
  }
  async loginTeacher(loginDto: LoginDto) {
    const { user_id, password } = loginDto;
    const user = await teacherService.findTeacherById(user_id);
    await user.correctPassword(password, user.password);
    const token = await this.signToken(user.user_id);
    return { user, token };
  }
  async signUpTeacher(createTeacherDto: CreateTeacherDto) {
    const { user_id, class_id } = createTeacherDto;
    if (class_id) await classService.findClassroomById(class_id);
    const user = await Teacher.findOne({ user_id }).select("+password");
    if (user)
      throw new AppError("user_id already exist, use another user_id", 400);
    const newUser = await teacherService.createTeacher(createTeacherDto);
    const token = await this.signToken(newUser.user_id);
    return { newUser, token };
  }
}
