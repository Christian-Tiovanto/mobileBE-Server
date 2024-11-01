import { JoiSchema } from "joi-class-decorators";
import { IUser } from "../models/UserModel";
import Joi from "joi";

export class LoginDto implements Pick<IUser, "user_id" | "password"> {
  @JoiSchema(Joi.string().required())
  user_id: string;
  @JoiSchema(Joi.string().required())
  password: string;
}
