import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { StudentController } from "../controllers/user.controller";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { LoginDto } from "../dtos/login.dto";
import { AuthController } from "../controllers/auth.contoller";
import { UpdateStudentDto } from "../dtos/update-student.dto";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
studentRouter
  .route("/:student_id/photo")
  .patch(upload.single("photo"), studentController.uploadStudentPhotoById())
  .get(studentController.getStudentPhotoById());

studentRouter.get(
  "/class/:class_id/all",
  studentController.getStudentsByClassId()
);
studentRouter.get("/all/student", studentController.getAllStudent());
studentRouter.get("/:user_id", studentController.getStudentById());
studentRouter.post("/coba/coba/coba", studentController.tesSignUpFirebase());
// studentRouter.get("/coba/coba/coba", studentController.tesGetFirebase());
export default studentRouter;
