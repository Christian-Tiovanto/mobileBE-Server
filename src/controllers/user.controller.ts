import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/student.service";
import catchAsync from "../utils/catch-async";
const studentService = new StudentService();
export class StudentController {
  constructor() {}

  updateStudent() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const user = await studentService.updateStudentById(
          req.params.student_id,
          req.body
        );
        delete user.password;
        res.status(200).json({
          status: "success",
          data: user,
        });
      }
    );
  }
}
