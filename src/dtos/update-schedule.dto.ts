import Joi from "joi";
import { JoiSchema } from "joi-class-decorators";
import { IMedicube } from "../models/MedicubeModel";
import { ValidationRegex } from "../enums/regex";

export class UpdateScheduleDto implements Pick<IMedicube, "schedule"> {
  @JoiSchema(
    Joi.array()
      .items(Joi.string().regex(ValidationRegex.SCHEDULE_HOUR))
      .required()
  )
  schedule: string[];
}
