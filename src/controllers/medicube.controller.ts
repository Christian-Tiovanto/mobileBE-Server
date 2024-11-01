import { NextFunction, Request, Response } from "express";
import { MedicubeService } from "../services/medicube.service";
import catchAsync from "../utils/catch-async";
const medicubeService = new MedicubeService();
export class MedicubeController {
  constructor() {}

  createMedicube() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const medicube = await medicubeService.createMedicube(req.body);
        res.status(201).json({
          status: "201",
          data: medicube,
        });
      }
    );
  }

  updateSchedule() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const medicube = await medicubeService.updateSchedule(
          req.params.id,
          req.body
        );
        res.status(200).json({
          status: "200",
          data: medicube,
        });
      }
    );
  }

  getAllSchedule() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const medicube = await medicubeService.getAllSchedulesByClock("00:00");
        res.status(200).json({ status: "200" });
      }
    );
  }
}
