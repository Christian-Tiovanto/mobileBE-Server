import { extname } from "path";
import { CreateAnnouncementDto } from "../dtos/create-announcement.dto";
import { CreateClassroomDto } from "../dtos/create-classroom.dto";
import Announcement from "../models/announcement.model";
import Classroom from "../models/class.model";
import AppError from "../utils/appError";
import { FirebaseService } from "./firebase.service";

const firebaseService = new FirebaseService();
export class AnnouncementService {
  constructor() {}

  async createAnnouncement(
    createAnnoucementDto: CreateAnnouncementDto,
    file: Express.Multer.File
  ) {
    const announcement = new Announcement(createAnnoucementDto);
    if (!file) {
      throw new AppError("need to upload image", 400);
    }
    const fileName = `${announcement._id}${extname(file.originalname)}`;
    announcement.file_url = fileName;
    const key = `annoucement/${fileName}`;
    await firebaseService.uploadFile(file, key);
    await announcement.save();
    return announcement;
  }

  async findClassroomById(classroomId: string) {
    const classroom = await Classroom.findOne({ _id: classroomId });
    if (!classroom)
      throw new AppError(`no classroom with id ${classroomId}`, 400);
    return classroom;
  }
  async getAnnouncementFileById(id: string) {
    const assignment = await Announcement.findById(id);
    const key = `annoucement/${assignment.file_url}`;
    const file = await firebaseService.getFile(key);
    return file;
  }
  async getAllClassroom() {
    const classrooms = await Classroom.find({});
    return classrooms;
  }
}
