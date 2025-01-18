import { JoiSchema } from "joi-class-decorators";
import { IStudent } from "../models/student.model";
import Joi from "joi";
import { LoginType } from "../enums/login-type";
import { LoginRole } from "../enums/role-login";
import { ISubmission } from "../models/submission.model";

export class UpdateSubmissionScoreDto implements Pick<ISubmission, "score"> {
  @JoiSchema(Joi.number().min(0).max(100).required())
  score: number;
}
