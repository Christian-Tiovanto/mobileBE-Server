import Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import { IGrade } from "../models/grade.model";
import { Types } from "mongoose";
import { GradeSubject } from "../enums/grade-list";
import { ValidationRegex } from "../enums/regex";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateGradeDto
  implements Pick<IGrade, "subject" | "tahun_ajaran" | "class_id">
{
  @JoiSchema(
    Joi.string()
      .valid(...Object.values(GradeSubject))
      .required()
  )
  subject: GradeSubject;

  @JoiSchema(Joi.string().required())
  tahun_ajaran: string;

  @JoiSchema(Joi.string().required())
  class_id: string;
}
