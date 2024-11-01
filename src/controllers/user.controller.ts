import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import catchAsync from "../utils/catch-async";
const userService = new UserService();
export class UserController {
  constructor() {}

  createUser() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const user = await userService.createUser(req.body);
        delete user.password;
        res.status(201).json({
          status: 201,
          data: user,
        });
      }
    );
  }
}
