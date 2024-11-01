import express from "express";
import { MedicubeController } from "../controllers/medicube.controller";
import { CreateMedicubeDto } from "../dtos/create-medicube.dto";
import { JoiValidatoinMiddleware } from "../middlewares/joi-validation.middleware";
import { UpdateScheduleDto } from "../dtos/update-schedule.dto";
const medicubeRouter = express.Router();
const medicubeController = new MedicubeController();
medicubeRouter
  .route("/")
  .post(
    JoiValidatoinMiddleware(CreateMedicubeDto),
    medicubeController.createMedicube()
  )
  .get(medicubeController.getAllSchedule());

medicubeRouter.patch(
  "/:id",
  JoiValidatoinMiddleware(UpdateScheduleDto),
  medicubeController.updateSchedule()
);
export default medicubeRouter;
