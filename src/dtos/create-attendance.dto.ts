import { Types } from "mongoose";
import { IAttendance } from "../models/attendance.model";
import { AttendanceStatus } from "../enums/attendance-status";
import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import Joi from "joi";
import { ValidationRegex } from "../enums/regex";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateAttendanceDto implements IAttendance {
  @JoiSchema(Joi.string().regex(ValidationRegex.OBJECT_ID).required())
  user_id: Types.ObjectId;

  @JoiSchema(Joi.string().required())
  class_id: string;

  @JoiSchema(
    Joi.string()
      .valid(...Object.values(AttendanceStatus))
      .required()
  )
  status: AttendanceStatus;

  @JoiSchema(
    Joi.when("status", {
      is: AttendanceStatus.PERMISSION,
      then: Joi.string().required(),
    }).optional()
  )
  reason: string;

  @JoiSchema(Joi.string().required())
  tahun_ajaran: string;

  @JoiSchema(Joi.date().iso().required())
  date: Date;
}

export class CreateAttendanceBulkDto {
  @JoiSchema(CreateAttendanceDto, (schema) =>
    Joi.array().items(schema.required()).required()
  )
  data: CreateAttendanceDto[];
}
