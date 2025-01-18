import { JoiSchema } from "joi-class-decorators";
import { IStudent } from "../models/student.model";
import Joi from "joi";
import { LoginType } from "../enums/login-type";
import { LoginRole } from "../enums/role-login";

export class LoginDto
  implements Pick<IStudent, "email" | "password" | "phone_number">
{
  @JoiSchema(
    Joi.string()
      .valid(...Object.values(LoginType))
      .required()
  )
  type: LoginType;
  @JoiSchema(
    Joi.when("type", { is: LoginType.EMAIL, then: Joi.string().required() })
  )
  email: string;
  @JoiSchema(
    Joi.when("type", {
      is: LoginType.PHONE_NUMBER,
      then: Joi.string().required(),
    })
  )
  phone_number: string;
  @JoiSchema(Joi.string().required())
  password: string;

  @JoiSchema(
    Joi.string()
      .valid(...Object.values(LoginRole))
      .required()
  )
  for_type: string;
}
