import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import multer from "multer";
import { CreateAssignmentDto } from "../dtos/create-assignment.dto";
import { AssignmentController } from "../controllers/assignment.controller";
import { SubmissionController } from "../controllers/submission.controller";
import { UpdateSubmissionScoreDto } from "../dtos/update-submission-score.dto";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const submissionRouter = express.Router();
const submissionController = new SubmissionController();

submissionRouter.patch(
  "/submit/assignment/:assignment_id/student/:student_id",
  upload.single("photo"),
  submissionController.uploadStudentAssignmentFileById()
);
submissionRouter.patch(
  "/:id/score",
  JoiValidationMiddleware({ classBodyType: UpdateSubmissionScoreDto }),
  submissionController.updateSubmissionScore()
);
submissionRouter.get(
  "/:id/file",
  submissionController.getStudentAssignmentFileById()
);
submissionRouter.get(
  "/student/:student_id",
  submissionController.getAllStudentAssignmentByOpenSubmission()
);
submissionRouter.get(
  "/assignment/:assignment_id/all",
  submissionController.getSubmissionByAssignmentId()
);
export default submissionRouter;
