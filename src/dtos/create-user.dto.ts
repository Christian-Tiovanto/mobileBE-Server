import Joi from "joi";
import {
  getClassSchema,
  JoiSchema,
  JoiSchemaOptions,
} from "joi-class-decorators";
import { IUser } from "../models/UserModel";
@JoiSchemaOptions({ allowUnknown: false })
export class CreateUserDto implements IUser {
  @JoiSchema(Joi.string().required())
  name: string;
  @JoiSchema(Joi.string().required())
  password: string;
  @JoiSchema(Joi.string().required())
  phone_number: string;
  @JoiSchema(Joi.string().required())
  timer: string;
}
