import { CreateMedicubeDto } from "../dtos/create-medicube.dto";
import { UpdateScheduleDto } from "../dtos/update-schedule.dto";
import Medicube from "../models/MedicubeModel";
import AppError from "../utils/appError";

export class MedicubeService {
  constructor() {}

  async createMedicube(createMedicubeDto: CreateMedicubeDto) {
    const medicube = await Medicube.create(createMedicubeDto);
    return medicube;
  }

  async updateSchedule(
    medicubeId: string,
    updateScheduleDto: UpdateScheduleDto
  ) {
    const medicube = await Medicube.findById(medicubeId).exec();
    if (!medicube) return new AppError("no medicube with that id", 404);
    medicube.schedule = updateScheduleDto.schedule;
    await medicube.save();
    return medicube;
  }

  async getAllSchedulesByClock(time: string) {
    const medicubes = await Medicube.find({ schedule: time });
    return medicubes;
  }
}
