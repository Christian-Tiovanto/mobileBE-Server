import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import { IClassroom } from "../models/class.model";
import Joi from "joi";
import { ISubject } from "../models/subject.model";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateSubjectDto implements ISubject {
  @JoiSchema(Joi.string().required())
  _id: string;
}
