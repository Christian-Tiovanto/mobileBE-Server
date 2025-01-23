import { Types } from "mongoose";
import { IAttendance } from "../models/attendance.model";
import { AttendanceStatus } from "../enums/attendance-status";
import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import Joi from "joi";
import { ValidationRegex } from "../enums/regex";
import { IGrade } from "../models/grade.model";
import { GradeSubject } from "../enums/grade-list";

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateGradeScoreDto
  implements
    Pick<IGrade, "mid_term_score" | "semester_score" | "_id" | "subject">
{
  @JoiSchema(Joi.number().min(0).max(100).optional())
  mid_term_score?: number;

  @JoiSchema(Joi.number().min(0).max(100).optional())
  semester_score?: number;

  @JoiSchema(Joi.number().min(0).max(100).optional())
  assignment_score?: number;

  @JoiSchema(Joi.string().regex(ValidationRegex.OBJECT_ID).required())
  _id: Types.ObjectId;
  @JoiSchema(Joi.string().optional())
  name: string;
  @JoiSchema(Joi.string().required())
  subject: string;
}

@JoiSchemaOptions({ allowUnknown: false })
export class UpdateGradeScoreBulkDto {
  @JoiSchema(UpdateGradeScoreDto, (schema) =>
    Joi.array().items(schema.required()).required()
  )
  data: UpdateGradeScoreDto[];
}
