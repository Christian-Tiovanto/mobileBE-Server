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
    updateTeacherDto.class_id = [...new Set(updateTeacherDto.class_id)];
    Object.assign(teacher, updateTeacherDto);
    await teacher.save();
    return teacher;
  }
  async findTeacherByUserId(userId: string) {
    const user = await Teacher.findOne({ user_id: userId }).select("+password");
    if (!user) throw new AppError("no teacher with that id", 404);
    return user;
  }
  async findTeacherById(userId: string) {
    const user = await Teacher.findById(userId).select("+password");
    if (!user) throw new AppError("no teacher with that id", 404);
    return user;
  }
  async findTeacherByEmail(email: string) {
    const user = await Teacher.findOne({ email: email }).select("+password");
    if (!user) throw new AppError("no teacher with that email", 404);
    return user;
  }
  async getTeacherByClassId(classId: string) {
    const teachers = await Teacher.findOne({ class_id: classId });
    return teachers;
  }
  async findTeacherByPhoneNumber(phoneNumber: string) {
    const user = await Teacher.findOne({ phone_number: phoneNumber }).select(
      "+password"
    );
    if (!user) throw new AppError("no teacher with that phone_number", 404);
    return user;
  }

  async getTeachersByClassId(classId: string) {
    const users = await Teacher.find({ class_id: classId });
    return users;
  }

  async uploadTeacherPhotoById(id: string, req: Request) {
    console.log("maosk sini atass");
    const teacher = await this.findTeacherById(id);
    console.log(req.file);
    const url = `photo_profile_teacher_${teacher.user_id}${extname(
      req.file.originalname
    )}`;
    teacher.photo_url = url;
    console.log("maosk sini");
    await firebaseService.uploadPhoto(req.file, url);
    await teacher.save();
    return teacher;
  }

  async getTeacherPhotoById(id: string) {
    const teacher = await this.findTeacherById(id);
    const photo = await firebaseService.getFile(teacher.photo_url);
    return { photo, teacher };
  }

  async getClassTeacherTeach(id: string) {
    const classrooms = await Teacher.findOne({ _id: id })
      .populate("class_id")
      .populate("homeroom_class")
      .select("class_id homeroom_class");
    console.log(classrooms);
    return classrooms;
  }

  async getAllTeacher() {
    const teachers = await Teacher.find({});
    return teachers;
  }
}
