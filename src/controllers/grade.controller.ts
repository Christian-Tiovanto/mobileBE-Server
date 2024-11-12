import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { GradeService } from "../services/grade.service";

const gradeService = new GradeService();
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

  updateGradeByUserIdNTahun() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const grade = await gradeService.updateGradeByUserIdNTahun(
          req.body,
          req.params.user_id,
          req.params.subject,
          req.params.tahun_ajaran
        );
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
        const subject = gradeService.getSubjectList();
        console.log(subject);
        return res.status(200).json({
          status: "success",
          data: subject,
        });
      }
    );
  }
}
