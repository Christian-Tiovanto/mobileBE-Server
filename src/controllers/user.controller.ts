import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/student.service";
import catchAsync from "../utils/catch-async";
const userService = new StudentService();
export class UserController {
  constructor() {}

  createUser() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const user = await userService.createStudent(req.body);
        delete user.password;
        res.status(201).json({
          status: 201,
          data: user,
        });
      }
    );
  }
}
