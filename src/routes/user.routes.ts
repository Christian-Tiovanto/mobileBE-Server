import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { UserController } from "../controllers/user.controller";
import { CreateUserDto } from "../dtos/create-user.dto";
import { LoginDto } from "../dtos/login.dto";
import { AuthController } from "../controllers/auth.contoller";
const userRouter = express.Router();
const userController = new UserController();
const authController = new AuthController();
userRouter.post(
  "/login",
  JoiValidationMiddleware({ classBodyType: LoginDto }),
  authController.login()
);
userRouter.post(
  "/signup",
  JoiValidationMiddleware({ classBodyType: CreateUserDto }),
  authController.signUp()
);
export default userRouter;
