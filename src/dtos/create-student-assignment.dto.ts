import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import Joi from "joi";
import { IAssignment } from "../models/assignment.model";
import { ISubmission } from "../models/submission.model";
import mongoose, { ObjectId } from "mongoose";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateStudentAssignmentDto implements ISubmission {
  due_date: Date;
  class_id: string;
  assignment_id: mongoose.Types.ObjectId;
  student_id: mongoose.Types.ObjectId;
  tahun_ajaran: string;
  score?: number;
  file_url?: string;
}
