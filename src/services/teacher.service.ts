import { connection, Types } from "mongoose";
import { CreateStudentDto } from "../dtos/create-student.dto";
import AppError from "../utils/appError";
import Teacher from "../models/teacher.model";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";
import { UpdateTeacherDto } from "../dtos/update-teacher-teach.dto";
import { ClassroomService } from "./classroom.service";
import { FirebaseService } from "./firebase.service";
import { extname } from "path";
import { Request } from "express";

const firebaseService = new FirebaseService();
const classroomService = new ClassroomService();
export class TeacherService {
  constructor() {}

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    const user = await Teacher.create(createTeacherDto);
    await user.save();
    return user;
  }

  async updateTeacher(userId: string, updateTeacherDto: UpdateTeacherDto) {
    if (updateTeacherDto.homeroom_class)
      await classroomService.findClassroomById(updateTeacherDto.homeroom_class);
    if (updateTeacherDto.class_id) {
      for (const class_id of updateTeacherDto.class_id) {
        await classroomService.findClassroomById(class_id);
      }
    }
    const teacher = await this.findTeacherById(userId);
    Object.assign(teacher, updateTeacherDto);

    await teacher.save();
    return teacher;
  }
  async findTeacherByUserId(userId: string) {
    const user = await Teacher.findOne({ user_id: userId }).select("+password");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }
  async findTeacherById(userId: string) {
    const user = await Teacher.findById(userId).select("+password");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }
  async findTeacherByEmail(email: string) {
    const user = await Teacher.findOne({ email: email }).select("+password");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }
  async findTeacherByPhoneNumber(phoneNumber: string) {
    const user = await Teacher.findOne({ phone_number: phoneNumber }).select(
      "+password"
    );
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }

  async getTeachersByClassId(classId: string) {
    const users = await Teacher.find({ class_id: classId });
    return users;
  }

  async uploadTeacherPhotoById(id: string, req: Request) {
    const teacher = await this.findTeacherById(id);

    const session = await connection.startSession();
    await session.withTransaction(async () => {
      const url = `photo_profile_teacher_${teacher.user_id}${extname(
        req.file.originalname
      )}`;
      teacher.photo_url = url;
      await firebaseService.uploadPhoto(req.file, url);
      await teacher.save({ session });
    });
    await session.endSession();
    return teacher;
  }

  async getTeacherPhotoById(id: string) {
    const teacher = await this.findTeacherById(id);
    const photo = await firebaseService.getPhoto(teacher.photo_url);
    return { photo, teacher };
  }
}
