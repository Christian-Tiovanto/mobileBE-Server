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
}
