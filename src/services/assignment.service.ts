import mongoose from "mongoose";
import Attendance from "../models/attendance.model";
import AppError from "../utils/appError";
import { ClassroomService } from "./classroom.service";
import { CreateAssignmentDto } from "../dtos/create-assignment.dto";
import Assignment from "../models/assignment.model";
import { FirebaseService } from "./firebase.service";
import { extname } from "path";
import { StudentService } from "./student.service";
import { SubmissionService } from "./submission.service";
import { CreateStudentAssignmentDto } from "../dtos/create-student-assignment.dto";
import { TeacherService } from "./teacher.service";

const classroomService = new ClassroomService();
const firebaseService = new FirebaseService();
const studentService = new StudentService();
const teacherService = new TeacherService();
const submissionService = new SubmissionService();
export class AssignmentService {
  constructor() {}

  async createAssignment(
    teacherId: string,
    createAssignmentDto: CreateAssignmentDto,
    file: Express.Multer.File
  ) {
    await classroomService.findClassroomById(createAssignmentDto.class_id);
    const students = await studentService.getStudentsByClassId(
      createAssignmentDto.class_id
    );
    const teacher = await teacherService.findTeacherById(teacherId);
    const assignment = new Assignment(createAssignmentDto);
    if (file) {
      const fileName = `${createAssignmentDto.class_id}-${
        assignment._id
      }${extname(file.originalname)}`;
      assignment.file_url = fileName;
      const key = `assignment/${fileName}`;
      await firebaseService.uploadFile(file, key);
    }
    assignment.subject = teacher.subject_teach;
    assignment.teacher_id = teacher._id;
    await assignment.save();
    const createStudentAssignmentDto: CreateStudentAssignmentDto[] = [];
    for (const student of students) {
      createStudentAssignmentDto.push({
        due_date: createAssignmentDto.due_date,
        class_id: createAssignmentDto.class_id,
        assignment_id: assignment._id,
        tahun_ajaran: createAssignmentDto.tahun_ajaran,
        student_id: student._id,
      });
    }
    await submissionService.createSubmissionBulk(createStudentAssignmentDto);
    return assignment;
  }
  async getAssignmentFileById(id: string) {
    const assignment = await Assignment.findById(id);
    const key = `assignment/${assignment.file_url}`;
    const file = await firebaseService.getFile(key);
    return file;
  }

  async getAllStudentAssignment(studentId: string) {
    const student = await studentService.findStudentById(studentId);
    const assignment = await Assignment.find({ class_id: student.class_id });
    return assignment;
  }

  async getAllAssignmentByClassId(classId: string) {
    const assignment = await Assignment.find({ class_id: classId });
    return assignment;
  }
}
