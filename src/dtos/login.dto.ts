import { JoiSchema } from "joi-class-decorators";
import { IStudent } from "../models/student.model";
import Joi from "joi";

export class LoginDto implements Pick<IStudent, "user_id" | "password"> {
  @JoiSchema(Joi.string().required())
  user_id: string;
  @JoiSchema(Joi.string().required())
  password: string;
}
