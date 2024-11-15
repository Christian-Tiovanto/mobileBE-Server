import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { TeacherService } from "../services/teacher.service";
import { sendBinaryWithMimeType } from "../utils/send-binary-with-mime-type";
import { extname } from "path";
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
        res.status(200).json({
          status: "success",
          data: teacher,
        });
      }
    );
  }

  uploadTeacherPhotoById() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const teacher = await teacherService.uploadTeacherPhotoById(
          req.params.teacher_id,
          req
        );
        res.status(200).json({
          status: "success",
          data: teacher,
        });
      }
    );
  }

  getTeacherPhotoById() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const data = await teacherService.getTeacherPhotoById(
          req.params.teacher_id
        );
        res.set(
          "Content-Type",
          `image/${extname(data.teacher.photo_url).substring(1)}`
        );
        res.send(data.photo[0]);
      }
    );
  }

  getClassTeacherTeach() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const classrooms = await teacherService.getClassTeacherTeach(
          req.params.teacher_id
        );
        res.status(200).json({
          status: "success",
          data: classrooms,
        });
      }
    );
  }

  getAllTeacher() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const teachers = await teacherService.getAllTeacher();
        res.status(200).json({
          status: "success",
          data: teachers,
        });
      }
    );
  }
}
