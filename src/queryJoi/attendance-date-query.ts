import Joi from "joi";
import { JoiSchema } from "joi-class-decorators";

export class AttendanceDateQuery {
  @JoiSchema(Joi.date().options({ convert: true }).required())
  date: Date;
}
