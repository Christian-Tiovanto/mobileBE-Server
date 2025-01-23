import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { CreateClassroomDto } from "../dtos/create-classroom.dto";
import { ClassroomController } from "../controllers/classroom.controller";
import { SubjectController } from "../controllers/subject.controller";
import { CreateSubjectDto } from "../dtos/create-subject.dto";
const subjectRouter = express.Router();
const classroomController = new SubjectController();
subjectRouter.post(
  "/",
  JoiValidationMiddleware({ classBodyType: CreateSubjectDto }),
  classroomController.createSubject()
);
subjectRouter.get("/all", classroomController.getAllSubject());
export default subjectRouter;
