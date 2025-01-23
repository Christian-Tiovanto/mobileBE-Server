import { NextFunction, Request, Response } from "express";
import { ClassroomService } from "../services/classroom.service";
import catchAsync from "../utils/catch-async";
import { SubjectService } from "../services/subject.service";

const subjectService = new SubjectService();
export class SubjectController {
  constructor() {}

  createSubject() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const subject = await subjectService.createClassroom(req.body);
        res.status(201).json({
          status: "success",
          data: subject,
        });
      }
    );
  }

  getAllSubject() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const subjects = await subjectService.getAllSubject();
        res.status(200).json({
          status: "success",
          data: subjects,
        });
      }
    );
  }
}
