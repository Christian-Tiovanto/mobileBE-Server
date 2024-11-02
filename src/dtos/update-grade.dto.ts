import { JoiSchema } from "joi-class-decorators";
import { IGrade } from "../models/grade.model";
import Joi from "joi";

export class UpdateGradeDto
  implements
    Partial<
      Pick<IGrade, "assignment_score" | "mid_term_score" | "semester_score">
    >
{
  @JoiSchema(Joi.number().min(0).max(100).optional())
  assignment_score?: number;

  @JoiSchema(Joi.number().min(0).max(100).optional())
  mid_term_score?: number;

  @JoiSchema(Joi.number().min(0).max(100).optional())
  semester_score?: number;
}
