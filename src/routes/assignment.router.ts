import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import multer from "multer";
import { CreateAssignmentDto } from "../dtos/create-assignment.dto";
import { AssignmentController } from "../controllers/assignment.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const assignmentRouter = express.Router();
const assignmentController = new AssignmentController();

assignmentRouter.post(
  "/",
  upload.single("photo"),
  JoiValidationMiddleware({ classBodyType: CreateAssignmentDto }),
  assignmentController.createAssignment()
);
assignmentRouter.get("/:id/file", assignmentController.getAssignmentFileById());
assignmentRouter.get(
  "/class/:class_id",
  assignmentController.getAllAssignmentByClassId()
);
assignmentRouter.get(
  "/student/:student_id",
  assignmentController.getStudentAssignment()
);

export default assignmentRouter;
