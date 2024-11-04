import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { UserController } from "../controllers/user.controller";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { LoginDto } from "../dtos/login.dto";
import { AuthController } from "../controllers/auth.contoller";
const studentRouter = express.Router();
const authController = new AuthController();
studentRouter.post(
  "/login",
  JoiValidationMiddleware({ classBodyType: LoginDto }),
  authController.loginStudent()
);
studentRouter.post(
  "/signup",
  JoiValidationMiddleware({ classBodyType: CreateStudentDto }),
  authController.signUpStudent()
);
export default studentRouter;
