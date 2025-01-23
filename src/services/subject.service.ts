import { CreateSubjectDto } from "../dtos/create-subject.dto";
import Subject from "../models/subject.model";
import AppError from "../utils/appError";

export class SubjectService {
  constructor() {}

  async createClassroom(createSubjectDto: CreateSubjectDto) {
    const classroom = await Subject.create(createSubjectDto);
    return classroom;
  }

  async getAllSubject() {
    const subjects = await Subject.find();
    return subjects;
  }
}
