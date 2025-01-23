import Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import { IGrade } from "../models/grade.model";
import { Types } from "mongoose";
import { GradeSubject } from "../enums/grade-list";
import { ValidationRegex } from "../enums/regex";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateGradeDto
  implements Pick<IGrade, "tahun_ajaran" | "class_id" | "user_id">
{
  @JoiSchema(Joi.string().required())
  tahun_ajaran: string;

  @JoiSchema(Joi.string().required())
  class_id: string;

  @JoiSchema(Joi.string().regex(ValidationRegex.OBJECT_ID).required())
  user_id: Types.ObjectId;
}
