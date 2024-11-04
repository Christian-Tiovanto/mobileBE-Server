import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { UserController } from "../controllers/user.controller";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { LoginDto } from "../dtos/login.dto";
import { AuthController } from "../controllers/auth.contoller";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";
const teacherRouter = express.Router();
const authController = new AuthController();
teacherRouter.post(
  "/login",
  JoiValidationMiddleware({ classBodyType: LoginDto }),
  authController.loginTeacher()
);
teacherRouter.post(
  "/signup",
  JoiValidationMiddleware({ classBodyType: CreateTeacherDto }),
  authController.signUpTeacher()
);
export default teacherRouter;
