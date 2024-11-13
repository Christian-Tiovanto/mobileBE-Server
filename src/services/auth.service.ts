import { LoginDto } from "../dtos/login.dto";
import Student, {
  IStudent,
  IStudentMethods,
  StudentDocument,
} from "../models/student.model";
import AppError from "../utils/appError";
import * as jwt from "jsonwebtoken";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { ClassroomService } from "./classroom.service";
import Teacher, {
  ITeacherMethods,
  TeacherDocument,
} from "../models/teacher.model";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";
import { TeacherService } from "./teacher.service";
import { FirebaseService } from "./firebase.service";
import { LoginType } from "../enums/login-type";
const userService = new StudentService();
const teacherService = new TeacherService();
const classService = new ClassroomService();
const firebaseService = new FirebaseService();
export class AuthService {
  constructor() {}
  private signToken(id) {
    console.log(process.env.JWT_SECRET);
    return jwt.sign({ id }, process.env.JWT_SECRET);
  }

  async loginStudent(loginDto: LoginDto) {
    const { type, password } = loginDto;
    let user: StudentDocument & IStudentMethods;
    if (type === LoginType.EMAIL) {
      user = await userService.findStudentByEmail(loginDto.email);
    } else {
      user = await userService.findStudentByPhoneNumber(loginDto.phone_number);
    }
    await user.correctPassword(password, user.password);
    await firebaseService.getUser(loginDto.email);
    const token = await this.signToken(user._id);
    return { user, token };
  }
  async signUpStudent(createUserDto: CreateStudentDto) {
    const { email, class_id } = createUserDto;
    if (class_id) await classService.findClassroomById(class_id);
    const user = await Student.findOne({ email }).select("+password");
    if (user)
      throw new AppError("user_id already exist, use another user_id", 400);
    await firebaseService.signUpStudent(createUserDto);
    const newUser = await userService.createStudent(createUserDto);
    const token = await this.signToken(newUser.user_id);
    return { newUser, token };
  }
  async loginTeacher(loginDto: LoginDto) {
    const { type, password } = loginDto;
    let teacher: TeacherDocument & ITeacherMethods;
    teacher = await teacherService.findTeacherByEmail(loginDto.email);
    await firebaseService.getUser(loginDto.email);
    await teacher.correctPassword(password, teacher.password);
    const token = await this.signToken(teacher._id);
    return { user: teacher, token };
  }
  async signUpTeacher(createTeacherDto: CreateTeacherDto) {
    const { user_id } = createTeacherDto;
    const user = await Teacher.findOne({ user_id }).select("+password");
    if (user)
      throw new AppError("user_id already exist, use another user_id", 400);
    await firebaseService.signUpTeacher(createTeacherDto);
    const newUser = await teacherService.createTeacher(createTeacherDto);
    const token = await this.signToken(newUser.user_id);
    return { newUser, token };
  }
}
