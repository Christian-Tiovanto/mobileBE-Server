import mongoose, {
  HydratedDocument,
  Model,
  model,
  ObjectId,
  Schema,
  Types,
} from "mongoose";
import { StudentAssignmentStatus } from "../enums/student-assignment-status";

export interface ISubmission {
  due_date: Date;
  class_id: string;
  score?: number;
  assignment_id: Types.ObjectId;
  student_id: Types.ObjectId;
  tahun_ajaran: string;
  file_url?: string;
  submission_time: Date;
  status?: StudentAssignmentStatus;
}

export type SubmissionModel = Model<ISubmission, {}>;
export type SubmissionDocument = HydratedDocument<ISubmission>;
const studentAssingmentSchema = new Schema<ISubmission, SubmissionModel>(
  {
    due_date: {
      type: Date,
      required: [true, "please provide the date of attendance"],
    },
    submission_time: {
      type: Date,
      default: null,
    },
    class_id: {
      type: String,
      required: [true, "please provide a class id"],
      ref: "classrooms",
    },
    assignment_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "need an assignment id"],
      ref: "assignment",
    },
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "need a student id"],
      ref: "student",
    },
    score: {
      type: Number,
      default: 0,
    },
    tahun_ajaran: {
      type: String,
      required: [true, "please provide tahun ajaran"],
    },
    status: {
      type: String,
      enum: StudentAssignmentStatus,
      default: StudentAssignmentStatus.OPEN,
    },
    file_url: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

const Submission = model<ISubmission, SubmissionModel>(
  "submission",
  studentAssingmentSchema
);
export default Submission;
