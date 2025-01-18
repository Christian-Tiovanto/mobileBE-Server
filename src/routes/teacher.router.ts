import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { LoginDto } from "../dtos/login.dto";
import { AuthController } from "../controllers/auth.contoller";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";
import { TeacherController } from "../controllers/teacher.controller";
import { UpdateTeacherDto } from "../dtos/update-teacher-teach.dto";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
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
teacherRouter.get("/all/teacher", teacherController.getAllTeacher());
teacherRouter.patch(
  "/:teacher_id",
  JoiValidationMiddleware({ classBodyType: UpdateTeacherDto }),
  teacherController.updateTeacherTeach()
);
teacherRouter
  .route("/:teacher_id/photo")
  .patch(upload.single("photo"), teacherController.uploadTeacherPhotoById())
  .get(teacherController.getTeacherPhotoById());
teacherRouter.get(
  "/:teacher_id/class-teach",
  teacherController.getClassTeacherTeach()
);
teacherRouter.get("/:teacher_id", teacherController.findTeacherById());
teacherRouter.delete(
  "/delete/semua/firebase",
  authController.deleteAllUserFirebase()
);
export default teacherRouter;
