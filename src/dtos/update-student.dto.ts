import { JoiSchema } from "joi-class-decorators";
import { IStudent } from "../models/student.model";
import Joi from "joi";

export class UpdateStudentDto
  implements Omit<IStudent, "user_id" | "role" | "password" | "tahun_ajaran">
{
  @JoiSchema(Joi.string().optional())
  name: string;
  @JoiSchema(Joi.string().optional())
  phone_number: string;
  @JoiSchema(Joi.string().optional())
  class_id: string;
}
