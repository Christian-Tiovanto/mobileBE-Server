import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { TeacherService } from "../services/teacher.service";
const teacherService = new TeacherService();
export class TeacherController {
  constructor() {}

  updateTeacherTeach() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const teacher = await teacherService.updateTeacher(
          req.params.teacher_id,
          req.body
        );
        res.status(201).json({
          status: 201,
          data: teacher,
        });
      }
    );
  }
}
