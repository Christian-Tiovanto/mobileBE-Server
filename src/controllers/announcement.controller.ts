import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { AssignmentService } from "../services/assignment.service";
import * as fileType from "file-type";
import { AnnouncementService } from "../services/announcement.service";

const announcementService = new AnnouncementService();
export class AnnouncementController {
  constructor() {}

  createAnnoucement() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const assignment = await announcementService.createAnnouncement(
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
  getAnnouncementFileById() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        console.log("req.header");
        console.log(req.headers);
        const file = await announcementService.getAnnouncementFileById(
          req.params.id
        );
        const type = await fileType.fromBuffer(file[0]);
        console.log(type);
        res.set("Content-Type", type.mime);
        res.set("Content-Disposition", 'inline; filename="example.pdf"');
        res.send(file[0]);
      }
    );
  }
  // getAllAssignmentByClassId() {
  //   return catchAsync(
  //     async (req: Request, res: Response, next: NextFunction) => {
  //       const assignments = await announcementService.getAllAssignmentByClassId(
  //         req.params.class_id
  //       );
  //       res.status(200).json({
  //         status: "success",
  //         data: assignments,
  //       });
  //     }
  //   );
  // }
}
