import express from "express";
import { JoiValidatoinMiddleware } from "../middlewares/joi-validation.middleware";
import { CreateClassroomDto } from "../dtos/create-classroom.dto";
import { GradeController } from "../controllers/grade.controller";
import { CreateGradeDto } from "../dtos/create-grade.dto";
const gradeRouter = express.Router();
const gradeController = new GradeController();
gradeRouter.post(
  "/bulk",
  JoiValidatoinMiddleware(CreateGradeDto),
  gradeController.createEmptyGradeBulk()
);
export default gradeRouter;
