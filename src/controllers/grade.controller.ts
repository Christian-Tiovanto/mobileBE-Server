import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { GradeService } from "../services/grade.service";

const gradeService = new GradeService();
export interface ReqWithUser extends Request {
  user: {
    id: string;
  };
}
export class GradeController {
  constructor() {}

  createEmptyGradeBulk() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const grades = await gradeService.createEmptyGradeBulk(req.body);
        return res.status(201).json({
          status: "success",
        });
      }
    );
  }
  createEmptyGrade() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const grade = await gradeService.createEmptyGrade(req.body);
        return res.status(201).json({
          status: "success",
        });
      }
    );
  }

  findGradeByUserIdnTahunNSubPopulate() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const grade = await gradeService.findGradeByUserIdnTahunNSubPopulate(
          req.params.user_id,
          req.params.tahun_ajaran,
          req.params.subject,
          req.params.class_id
        );
        res.status(200).json({
          status: "success",
          data: grade,
        });
      }
    );
  }
  getAllGradeByClassNPopulate() {
    return catchAsync(
      async (req: ReqWithUser, res: Response, next: NextFunction) => {
        const grades = await gradeService.getAllGradeByClassNPopulate(
          req.params.class_id,
          req.user.id
        );
        res.status(200).json({
          status: "success",
          data: grades,
        });
      }
    );
  }
  updateGradeByUserIdNTahun() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const grade = await gradeService.updateGradeByUserIdNTahun(
          req.body,
          req.params.user_id,
          req.params.subject,
          req.params.tahun_ajaran,
          req.params.class_id
        );
        return res.status(200).json({
          status: "success",
          data: grade,
        });
      }
    );
  }
  updateGradeScoreBulk() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        console.log("masok sini kan");
        const grade = await gradeService.updateGradeScoreBulk(req.body);
        return res.status(200).json({
          status: "success",
          data: grade,
        });
      }
    );
  }

  getSubjectList() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const subject = await gradeService.getSubjectList();
        console.log(subject);
        return res.status(200).json({
          status: "success",
          data: subject,
        });
      }
    );
  }
  getStudentNItsGrade() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const grades = await gradeService.getStudentNItsGrade(
          req.params.user_id,
          req.params.class_id,
          req.params.tahun_ajaran
        );
        return res.status(200).json({
          status: "success",
          data: grades,
        });
      }
    );
  }
  getLoggedInStudentGrade() {
    return catchAsync(
      async (req: ReqWithUser, res: Response, next: NextFunction) => {
        const grades = await gradeService.getLoggedInStudentGrade(req.user.id);
        return res.status(200).json({
          status: "success",
          data: grades,
        });
      }
    );
  }
}
