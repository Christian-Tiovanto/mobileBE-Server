import { NextFunction, Request, Response } from "express";
import { ClassroomService } from "../services/classroom.service";
import catchAsync from "../utils/catch-async";

const classroomService = new ClassroomService();
export class ClassroomController {
  constructor() {}

  createClassroom() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const classroom = await classroomService.createClassroom(req.body);
        res.status(201).json({
          status: "success",
          data: classroom,
        });
      }
    );
  }

  getAllClassroom() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const classrooms = await classroomService.getAllClassroom();
        res.status(200).json({
          status: "success",
          data: classrooms,
        });
      }
    );
  }
}
