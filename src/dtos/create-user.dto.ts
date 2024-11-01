import Joi from "joi";
import {
  getClassSchema,
  JoiSchema,
  JoiSchemaOptions,
} from "joi-class-decorators";
import { IUser } from "../models/UserModel";
import { UserRole } from "../enums/user-role";
@JoiSchemaOptions({ allowUnknown: false })
export class CreateUserDto implements IUser {
  @JoiSchema(Joi.string().required())
  name: string;
  @JoiSchema(Joi.string().required())
  password: string;
  @JoiSchema(Joi.string().required())
  phone_number: string;
  @JoiSchema(Joi.string().required())
  user_id: string;
  @JoiSchema(
    Joi.string()
      .valid(...Object.values(UserRole))
      .required()
  )
  role: UserRole;
}
