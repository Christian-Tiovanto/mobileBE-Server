import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { AuthService } from "../services/auth.service";
import { StudentDocument } from "../models/student.model";
import { TeacherDocument } from "../models/teacher.model";
import { FirebaseService } from "../services/firebase.service";
const authService = new AuthService();
const firebaseService = new FirebaseService();
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
    console.log("bapak dia");
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
        console.log("eaaa");
        const userAndToken = await authService.signUpTeacher(req.body);
        console.log("siniii");
        this.sendToken(userAndToken.newUser, 201, res, userAndToken.token);
      }
    );
  }

  deleteAllUserFirebase() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        await firebaseService.deleteAllUsersFirebase();
        res.status(200).json({
          status: "success",
        });
      }
    );
  }
}
