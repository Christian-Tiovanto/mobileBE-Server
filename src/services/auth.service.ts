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
const studentService = new StudentService();
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
      user = await studentService.findStudentByEmail(loginDto.email);
    } else {
      user = await studentService.findStudentByPhoneNumber(
        loginDto.phone_number
      );
    }
    await user.correctPassword(password, user.password);
    await firebaseService.getUser(loginDto.email);
    const token = await this.signToken(user._id);
    return { user, token };
  }
  async signUpStudent(createUserDto: CreateStudentDto) {
    const { email, class_id, password } = createUserDto;
    if (class_id) await classService.findClassroomById(class_id);
    const user = await Student.findOne({ email }).select("+password");
    const teacher = await Teacher.findOne({ email }).select("+password");
    if (password.length < 6)
      throw new AppError(
        "password length have to be more than 5 character",
        400
      );

    if (user || teacher)
      throw new AppError("email already exist, use another email", 400);
    await firebaseService.signUpStudent(createUserDto);
    const newUser = await studentService.createStudent(createUserDto);
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
    const { user_id, email, password } = createTeacherDto;
    const teacher = await Teacher.findOne({ email }).select("+password");
    const student = await Student.findOne({ email }).select("+password");
    if (password.length < 6)
      throw new AppError(
        "password length have to be more than 5 character",
        400
      );
    if (teacher || student)
      throw new AppError("email already exist, use another email", 400);
    await firebaseService.signUpTeacher(createTeacherDto);
    const newUser = await teacherService.createTeacher(createTeacherDto);
    const token = await this.signToken(newUser.user_id);
    return { newUser, token };
  }
}
