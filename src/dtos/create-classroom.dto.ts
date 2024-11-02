import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import { IClassroom } from "../models/class.model";
import Joi from "joi";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateClassroomDto implements IClassroom {
  @JoiSchema(Joi.string().required())
  _id: string;
}
