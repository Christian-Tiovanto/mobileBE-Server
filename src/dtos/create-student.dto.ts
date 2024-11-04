import Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import { IStudent } from "../models/student.model";
@JoiSchemaOptions({ allowUnknown: false })
export class CreateStudentDto implements Omit<IStudent, "role"> {
  @JoiSchema(Joi.string().required())
  name: string;
  @JoiSchema(Joi.string().required())
  password: string;
  @JoiSchema(Joi.string().required())
  phone_number: string;
  @JoiSchema(Joi.string().required())
  user_id: string;
  @JoiSchema(Joi.string().optional())
  class_id: string;
  @JoiSchema(Joi.string().required())
  tahun_ajaran: string;
}
