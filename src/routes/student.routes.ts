import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { StudentController } from "../controllers/user.controller";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { LoginDto } from "../dtos/login.dto";
import { AuthController } from "../controllers/auth.contoller";
import { UpdateStudentDto } from "../dtos/update-student.dto";
const studentRouter = express.Router();
const authController = new AuthController();
const studentController = new StudentController();
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
studentRouter.patch(
  "/:student_id",
  JoiValidationMiddleware({ classBodyType: UpdateStudentDto }),
  studentController.updateStudent()
);
export default studentRouter;
