import { CreateClassroomDto } from "../dtos/create-classroom.dto";
import Classroom from "../models/class.model";

export class ClassroomService {
  constructor() {}

  async createClassroom(createClassroomDto: CreateClassroomDto) {
    const classroom = await Classroom.create(createClassroomDto);
    return classroom;
  }
}
