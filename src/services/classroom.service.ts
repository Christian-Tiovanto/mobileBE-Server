import { CreateClassroomDto } from "../dtos/create-classroom.dto";
import Classroom from "../models/class.model";
import AppError from "../utils/appError";

export class ClassroomService {
  constructor() {}

  async createClassroom(createClassroomDto: CreateClassroomDto) {
    const classroom = await Classroom.create(createClassroomDto);
    return classroom;
  }

  async findClassroomById(classroomId: string) {
    const classroom = await Classroom.findOne({ _id: classroomId });
    if (!classroom)
      throw new AppError(`no classroom with id ${classroomId}`, 400);
    return classroom;
  }

  async getAllClassroom() {
    const classrooms = await Classroom.find({});
    return classrooms;
  }
}
