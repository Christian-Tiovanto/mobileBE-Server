import { CreateGradeDto } from "../dtos/create-grade.dto";
import { UpdateGradeDto } from "../dtos/update-grade.dto";
import { GradeSubject } from "../enums/grade-list";
import Grade, { GradeDocument, IGrade } from "../models/grade.model";
import AppError from "../utils/appError";
import { ClassroomService } from "./classroom.service";
import { StudentService } from "./student.service";

const userService = new StudentService();
const classService = new ClassroomService();
export class GradeService {
  constructor() {}

  async createEmptyGradeBulk(createGradeDto: CreateGradeDto) {
    const { class_id, subject, tahun_ajaran } = createGradeDto;
    await classService.findClassroomById(class_id);
    const grade = await this.getGradeByClassIdNSubNTahun(
      class_id,
      tahun_ajaran.toString(),
      subject
    );
    if (grade) throw new AppError("grade already created", 400);
    const users = await userService.getStudentsByClassId(class_id);
    const grades: GradeDocument[] = users.map((user) => {
      return new Grade({ user_id: user._id, class_id, subject, tahun_ajaran });
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
    tahunAjaran: string
  ) {
    const grade = await this.findGradeByUserIdnTahunNSub(
      userId,
      tahunAjaran,
      subject
    );
    Object.assign(grade, updateGradeDto);
    await grade.save();
    return grade;
  }

  async findGradeByUserIdnTahunNSub(
    userId: string,
    tahunAjaran: string,
    subject
  ) {
    const grade = await Grade.findOne({
      user_id: userId,
      tahun_ajaran: tahunAjaran,
      subject,
    }).exec();
    if (!grade) throw new AppError("no grade found", 404);
    return grade;
  }
}
