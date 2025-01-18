import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import * as fileType from "file-type";
import { SubmissionService } from "../services/submission.service";

const submissionService = new SubmissionService();
export class SubmissionController {
  constructor() {}

  uploadStudentAssignmentFileById() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const assignment = await submissionService.uploadSubmissionFile(
          req.params.assignment_id,
          req.params.student_id,
          req.file
        );
        res.status(201).json({
          status: "success",
          data: assignment,
        });
      }
    );
  }
  updateSubmissionScore() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const assignment = await submissionService.updateSubmissionScore(
          req.params.id,
          req.body
        );
        res.status(200).json({
          status: "success",
          data: assignment,
        });
      }
    );
  }
  getSubmissionByAssignmentId() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const assignment = await submissionService.getSubmissionByAssignmentId(
          req.params.assignment_id
        );
        res.status(200).json({
          status: "success",
          data: assignment,
        });
      }
    );
  }
  getAllStudentAssignmentByOpenSubmission() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const assignment =
          await submissionService.getAllStudentAssignmentByOpenSubmission(
            req.params.student_id
          );
        res.status(200).json({
          status: "success",
          data: assignment,
        });
      }
    );
  }
  getStudentAssignmentFileById() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const file = await submissionService.getSubmissionFileById(
          req.params.id
        );
        const type = await fileType.fromBuffer(file[0]);
        console.log(type);
        res.set("Content-Type", type.mime);
        res.set("Content-Disposition", 'attachment; filename="example.pdf"');
        res.send(file[0]);
      }
    );
  }
}
