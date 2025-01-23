import Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import { IStudent } from "../models/student.model";
import { ITeacher } from "../models/teacher.model";
import { GradeSubject } from "../enums/grade-list";
@JoiSchemaOptions({ allowUnknown: false })
export class CreateTeacherDto
  implements
    Omit<ITeacher, "role" | "homeroom_class" | "class_id" | "photo_url">
{
  @JoiSchema(Joi.string().required())
  name: string;
  @JoiSchema(Joi.string().required())
  email: string;
  @JoiSchema(Joi.string().required())
  password: string;
  @JoiSchema(Joi.string().required())
  phone_number: string;
  @JoiSchema(Joi.string().required())
  user_id: string;
  @JoiSchema(Joi.date().required())
  enrollment_date: Date;
  @JoiSchema(Joi.string().optional())
  subject_teach: string;
}
