import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { AssignmentService } from "../services/assignment.service";
import * as fileType from "file-type";

const assignmentService = new AssignmentService();
export class AssignmentController {
  constructor() {}

  createAssignment() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const assignment = await assignmentService.createAssignment(
          req.body,
          req.file
        );
        res.status(201).json({
          status: "sucess",
          data: assignment,
        });
      }
    );
  }
  getAssignmentFileById() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        console.log("req.header");
        console.log(req.headers);
        const file = await assignmentService.getAssignmentFileById(
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
  getAllAssignmentByClassId() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const assignments = await assignmentService.getAllAssignmentByClassId(
          req.params.class_id
        );
        res.status(200).json({
          status: "success",
          data: assignments,
        });
      }
    );
  }
  getStudentAssignment() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const assignments = await assignmentService.getAllStudentAssignment(
          req.params.student_id
        );
        res.status(200).json({
          status: "success",
          data: assignments,
        });
      }
    );
  }
}
