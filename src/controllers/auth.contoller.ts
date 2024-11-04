import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { AuthService } from "../services/auth.service";
import { StudentDocument } from "../models/student.model";
import { TeacherDocument } from "../models/teacher.model";
const authService = new AuthService();
export class AuthController {
  constructor() {}

  private sendToken(
    user: StudentDocument | TeacherDocument,
    statusCode,
    res: Response,
    token: string
  ) {
    res.cookie("jwt", token);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  }

  loginStudent() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const userAndToken = await authService.loginStudent(req.body);
        this.sendToken(userAndToken.user, 200, res, userAndToken.token);
      }
    );
  }
  signUpStudent() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const userAndToken = await authService.signUpStudent(req.body);
        this.sendToken(userAndToken.newUser, 200, res, userAndToken.token);
      }
    );
  }
  loginTeacher() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const userAndToken = await authService.loginTeacher(req.body);
        this.sendToken(userAndToken.user, 200, res, userAndToken.token);
      }
    );
  }
  signUpTeacher() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const userAndToken = await authService.signUpTeacher(req.body);
        this.sendToken(userAndToken.newUser, 200, res, userAndToken.token);
      }
    );
  }
}
