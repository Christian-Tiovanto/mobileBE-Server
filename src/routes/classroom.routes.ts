import express from "express";
import { JoiValidatoinMiddleware } from "../middlewares/joi-validation.middleware";
import { CreateClassroomDto } from "../dtos/create-classroom.dto";
import { ClassroomController } from "../controllers/classroom.controller";
const classroomRouter = express.Router();
const classroomController = new ClassroomController();
classroomRouter.post(
  "/",
  JoiValidatoinMiddleware(CreateClassroomDto),
  classroomController.createClassroom()
);
export default classroomRouter;
