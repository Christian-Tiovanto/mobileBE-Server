import { connection, Types } from "mongoose";
import { CreateStudentDto } from "../dtos/create-student.dto";
import Student from "../models/student.model";
import AppError from "../utils/appError";
import { UpdateStudentDto } from "../dtos/update-student.dto";
import { ClassroomService } from "./classroom.service";
import { FirebaseService } from "./firebase.service";
import { extname } from "path";
import { Request } from "express";

const firebaseService = new FirebaseService();
const classroomService = new ClassroomService();
export class StudentService {
  constructor() {}

  async getAllStudent() {
    const students = await Student.find({});
    return students;
  }
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
    const user = await Student.findOne({ _id: id }).select("+phone_number");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }
  async findStudentByEmail(email: string) {
    const user = await Student.findOne({ email: email }).select("+password");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }
  async findStudentByPhoneNumber(phoneNumber: string) {
    const user = await Student.findOne({ phone_number: phoneNumber });
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }

  async getStudentsByClassId(classId: string) {
    const users = await Student.find({ class_id: classId });
    return users;
  }
  async getStudentById(userId: string) {
    const user = await Student.findById(userId);
    return user;
  }

  async updateStudentById(id: string, updateStudentDto: UpdateStudentDto) {
    const user = await this.findStudentById(id);
    if (updateStudentDto.class_id)
      await classroomService.findClassroomById(updateStudentDto.class_id);
    Object.assign(user, updateStudentDto);
    await user.save();
    return user;
  }

  async uploadStudentPhotoById(id: string, req: Request) {
    const student = await this.findStudentById(id);

    const url = `photo_profile_student_${student.user_id}${extname(
      req.file.originalname
    )}`;
    student.photo_url = url;
    await firebaseService.uploadPhoto(req.file, url);
    await student.save();
    return student;
  }

  async getStudentPhotoById(id: string) {
    const student = await this.findStudentById(id);
    const photo = await firebaseService.getFile(student.photo_url);
    return { photo, student };
  }
}
