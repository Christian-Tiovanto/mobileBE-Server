import mongoose from "mongoose";
import { CreateGradeBulkDto } from "../dtos/create-grade.dto";
import { UpdateGradeDto } from "../dtos/update-grade.dto";
import { GradeSubject } from "../enums/grade-list";
import Grade, { GradeDocument, IGrade } from "../models/grade.model";
import AppError from "../utils/appError";
import { ClassroomService } from "./classroom.service";
import { StudentService } from "./student.service";
import { TeacherService } from "./teacher.service";
import { UpdateGradeScoreBulkDto } from "../dtos/update-grade-bulk.dto";
import { CreateGradeDto } from "../dtos/create-grade.dto-one";
import { SubjectService } from "./subject.service";

const studentService = new StudentService();
const teacherService = new TeacherService();
const classService = new ClassroomService();
const subjectService = new SubjectService();
export class GradeService {
  constructor() {}

  async createEmptyGradeBulk(createGradeDto: CreateGradeBulkDto) {
    const { class_id, tahun_ajaran, teacher_id } = createGradeDto;
    await classService.findClassroomById(class_id);
    const teacher = await teacherService.findTeacherById(teacher_id.toString());
    const grade = await this.getGradeByClassIdNSubNTahun(
      class_id,
      tahun_ajaran.toString(),
      teacher.subject_teach
    );
    if (grade) throw new AppError("grade already created", 400);
    const users = await studentService.getStudentsByClassId(class_id);
    const grades: GradeDocument[] = users.map((user) => {
      return new Grade({
        user_id: user._id,
        class_id,
        subject: teacher.subject_teach,
        tahun_ajaran,
        teacher_id,
      });
    });
    await Grade.bulkSave(grades);
  }
  async createEmptyGrade(createGradeDto: CreateGradeDto) {
    const { class_id, tahun_ajaran, user_id } = createGradeDto;
    await classService.findClassroomById(class_id);
    const teachers = await teacherService.getTeachersByClassId(class_id);
    const users = await studentService.getStudentsByClassId(class_id);
    const gradesCheck = await this.getGradesByClassIdNSubNTahun(
      class_id,
      tahun_ajaran.toString(),
      user_id.toString()
    );
    console.log("gradesCheck");
    console.log(gradesCheck);
    if (gradesCheck.length != 0) return;
    console.log("gak lewat");
    const grades: GradeDocument[] = teachers.map((teacher) => {
      return new Grade({
        user_id: user_id.toString(),
        class_id,
        subject: teacher.subject_teach,
        tahun_ajaran,
        teacher_id: teacher._id,
      });
    });
    console.log(grades);
    await Grade.bulkSave(grades);
  }

  async getGradeByClassIdNSubNTahun(
    classroomId: string,
    tahunAjaran: string,
    subject: string
  ) {
    const grade = await Grade.findOne({
      class_id: classroomId,
      tahun_ajaran: tahunAjaran,
      subject: subject,
    });
    return grade;
  }
  async getGradesByClassIdNSubNTahun(
    classroomId: string,
    tahunAjaran: string,
    studentId: string
  ) {
    const grades = await Grade.find({
      class_id: classroomId,
      tahun_ajaran: tahunAjaran,
      user_id: studentId,
    });
    return grades;
  }

  async updateGradeByUserIdNTahun(
    updateGradeDto: UpdateGradeDto,
    userId: string,
    subject: string,
    tahunAjaran: string,
    classId: string
  ) {
    const grade = await this.findGradeByUserIdnTahunNSub(
      userId,
      tahunAjaran,
      subject,
      classId
    );
    Object.assign(grade, updateGradeDto);
    await grade.save();
    return grade;
  }
  async updateGradeScoreBulk(updateGradeScoreBulkDto: UpdateGradeScoreBulkDto) {
    for (const gradeDto of updateGradeScoreBulkDto.data) {
      const grade = await Grade.findById(gradeDto._id);
      if (!grade) {
        throw new AppError("grade not found", 404);
      }
      delete gradeDto._id;
      Object.assign(grade, gradeDto);
      await grade.save();
    }
    return "success";
  }

  async findGradeByUserIdnTahunNSub(
    userId: string,
    tahunAjaran: string,
    subject,
    classId: string
  ) {
    const grade = await Grade.findOne({
      user_id: userId,
      tahun_ajaran: tahunAjaran,
      subject,
      class_id: classId,
    }).exec();
    if (!grade) throw new AppError("no grade found", 404);
    return grade;
  }
  async findGradeByClassIdNUserIdN(
    userId: string,
    tahunAjaran: string,
    subject,
    classId: string
  ) {
    const grade = await Grade.findOne({
      user_id: userId,
      tahun_ajaran: tahunAjaran,
      subject,
      class_id: classId,
    }).exec();
    if (!grade) throw new AppError("no grade found", 404);
    return grade;
  }

  async getStudentNItsGrade(
    userId: string,
    classId: string,
    tahunAjaran: string
  ) {
    const grades = await Grade.find({
      user_id: userId,
      class_id: classId,
      tahun_ajaran: tahunAjaran,
    }).populate("user_id");
    return grades;
  }
  async getLoggedInStudentGrade(userId: string) {
    const student = await studentService.findStudentById(userId);
    const grades = await Grade.find({
      user_id: userId,
      class_id: student.class_id,
      tahun_ajaran: "2023",
    }).populate("user_id");
    return grades;
  }
  async findGradeByUserIdnTahunNSubPopulate(
    userId: string,
    tahunAjaran: string,
    subject,
    classId: string
  ) {
    const grade = await Grade.findOne({
      user_id: userId,
      tahun_ajaran: tahunAjaran,
      subject,
      class_id: classId,
    }).populate("user_id");
    if (!grade) throw new AppError("no grade found", 404);
    return grade;
  }
  async getAllGradeByClassNPopulate(classId: string, teacherId: string) {
    const teacher = await teacherService.findTeacherById(teacherId);
    const subject = teacher.subject_teach;
    const grades = await Grade.aggregate([
      {
        $match: {
          class_id: classId,
          subject,
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "user_id",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: {
          path: "$student",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "student.name": 1,
          semester_score: 1,
          assignment_score: 1,
          mid_term_score: 1,
          subject: 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$student", // Data from the student field
              "$$ROOT", // The original document
            ],
          },
        },
      },
      {
        $unset: "student", // Remove the nested student field
      },
    ]);
    return grades;
  }

  async getSubjectList() {
    const subjects = await subjectService.getAllSubject();
    return subjects.map((subject) => {
      return subject._id;
    });
  }
}
