import Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import { Types } from "mongoose";
import { IMedicube } from "../models/MedicubeModel";
@JoiSchemaOptions({ allowUnknown: false })
export class CreateMedicubeDto
  implements Omit<IMedicube, "is_verified" | "schedule">
{
  @JoiSchema(Joi.string().required())
  phone_number: string;

  @JoiSchema(Joi.string().required())
  owner: Types.ObjectId;
}
