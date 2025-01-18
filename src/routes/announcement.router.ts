import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import multer from "multer";
import { CreateAssignmentDto } from "../dtos/create-assignment.dto";
import { AssignmentController } from "../controllers/assignment.controller";
import { AnnouncementController } from "../controllers/announcement.controller";
import { CreateAnnouncementDto } from "../dtos/create-announcement.dto";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const announcementRouter = express.Router();
const annoucementController = new AnnouncementController();

announcementRouter.post(
  "/",
  upload.single("photo"),
  JoiValidationMiddleware({ classBodyType: CreateAnnouncementDto }),
  annoucementController.createAnnoucement()
);
announcementRouter.get(
  "/:id/file",
  annoucementController.getAnnouncementFileById()
);
export default announcementRouter;
