import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { CreateClassroomDto } from "../dtos/create-classroom.dto";
import { ClassroomController } from "../controllers/classroom.controller";
const classroomRouter = express.Router();
const classroomController = new ClassroomController();
classroomRouter.post(
  "/",
  JoiValidationMiddleware({ classBodyType: CreateClassroomDto }),
  classroomController.createClassroom()
);
export default classroomRouter;
