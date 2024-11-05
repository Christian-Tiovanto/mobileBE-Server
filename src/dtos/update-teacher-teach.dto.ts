import { JoiSchema } from "joi-class-decorators";
import { GradeSubject } from "../enums/grade-list";
import { ITeacher } from "../models/teacher.model";
import Joi from "joi";
import { UserRole } from "../enums/user-role";

export class UpdateTeacherDto
  implements
    Pick<
      ITeacher,
      "subject_teach" | "role" | "class_id" | "homeroom_class" | "phone_number"
    >
{
  @JoiSchema(
    Joi.array()
      .items(Joi.string().valid(...Object.values(GradeSubject)))
      .required()
  )
  subject_teach: GradeSubject[];

  @JoiSchema(
    Joi.string()
      .valid(...Object.values(UserRole))
      .optional()
  )
  role: UserRole;

  @JoiSchema(Joi.array().items(Joi.string()).optional())
  class_id: string[];

  @JoiSchema(Joi.string().optional())
  homeroom_class: string;

  @JoiSchema(Joi.string().optional())
  phone_number: string;
}