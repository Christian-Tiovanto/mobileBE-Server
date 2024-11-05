import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { UserController } from "../controllers/user.controller";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { LoginDto } from "../dtos/login.dto";
import { AuthController } from "../controllers/auth.contoller";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";
import { TeacherController } from "../controllers/teacher.controller";
import { UpdateTeacherDto } from "../dtos/update-teacher-teach.dto";
const teacherRouter = express.Router();
const authController = new AuthController();
const teacherController = new TeacherController();
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
teacherRouter.patch(
  "/:teacher_id",
  JoiValidationMiddleware({ classBodyType: UpdateTeacherDto }),
  teacherController.updateTeacherTeach()
);
export default teacherRouter;
