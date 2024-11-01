import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { AuthService } from "../services/auth.service";
import { UserDocument } from "../models/UserModel";
const authService = new AuthService();
export class AuthController {
  constructor() {}

  private sendToken(
    user: UserDocument,
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

  login() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const userAndToken = await authService.login(req.body);
        this.sendToken(userAndToken.user, 200, res, userAndToken.token);
      }
    );
  }
  signUp() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const userAndToken = await authService.signUp(req.body);
        this.sendToken(userAndToken.newUser, 200, res, userAndToken.token);
      }
    );
  }
}
