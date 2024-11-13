import { CreateGradeDto } from "../dtos/create-grade.dto";
import { UpdateGradeDto } from "../dtos/update-grade.dto";
import { GradeSubject } from "../enums/grade-list";
import Grade, { GradeDocument, IGrade } from "../models/grade.model";
import AppError from "../utils/appError";
import { ClassroomService } from "./classroom.service";
import { StudentService } from "./student.service";
import { TeacherService } from "./teacher.service";

const studentService = new StudentService();
const teacherService = new TeacherService();
const classService = new ClassroomService();
export class GradeService {
  constructor() {}

  async createEmptyGradeBulk(createGradeDto: CreateGradeDto) {
    const { class_id, subject, tahun_ajaran, teacher_id } = createGradeDto;
    await classService.findClassroomById(class_id);
    const teacher = await teacherService.findTeacherById(teacher_id.toString());
    if (!teacher.subject_teach.includes(subject))
      throw new AppError(
        `teacher ${teacher.name} doesnt teach ${subject}`,
        400
      );
    const grade = await this.getGradeByClassIdNSubNTahun(
      class_id,
      tahun_ajaran.toString(),
      subject
    );
    if (grade) throw new AppError("grade already created", 400);
    if (!teacher.subject_teach.includes(subject))
      throw new AppError(`this teacher doesnt teach ${subject} `, 400);
    const users = await studentService.getStudentsByClassId(class_id);
    const grades: GradeDocument[] = users.map((user) => {
      return new Grade({
        user_id: user._id,
        class_id,
        subject,
        tahun_ajaran,
        teacher_id,
      });
    });
    await Grade.bulkSave(grades);
  }

  async getGradeByClassIdNSubNTahun(
    classroomId: string,
    tahunAjaran: string,
    subject: GradeSubject
  ) {
    const grade = await Grade.findOne({
      class_id: classroomId,
      tahun_ajaran: tahunAjaran,
      subject: subject,
    });
    return grade;
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

  getSubjectList() {
    console.log(Object.values(GradeSubject));
    return Object.values(GradeSubject);
  }
}
