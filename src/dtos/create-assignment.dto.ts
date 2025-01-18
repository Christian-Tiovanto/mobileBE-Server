import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import Joi from "joi";
import { IAssignment } from "../models/assignment.model";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateAssignmentDto implements IAssignment {
  @JoiSchema(Joi.string().required())
  due_date: Date;

  @JoiSchema(Joi.string().required())
  class_id: string;

  @JoiSchema(Joi.string().required())
  title: string;

  @JoiSchema(Joi.string().required())
  description: string;

  @JoiSchema(Joi.string().required())
  tahun_ajaran: string;

  // @JoiSchema(Joi.array().items(Joi.string()).optional())
  file_url: string;
}
