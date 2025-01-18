import mongoose, {
  HydratedDocument,
  Model,
  model,
  Schema,
  Types,
} from "mongoose";
import { GradeSubject } from "../enums/grade-list";

export interface IGrade {
  subject: GradeSubject;
  user_id: Types.ObjectId;
  teacher_id: Types.ObjectId;
  class_id: string;
  assignment_score?: number;
  mid_term_score?: number;
  semester_score?: number;
  tahun_ajaran: string;
}

export type GradeModel = Model<IGrade, {}>;
export type GradeDocument = HydratedDocument<IGrade>;
const gradeSchema = new Schema<IGrade, GradeModel>(
  {
    subject: {
      type: String,
      enum: GradeSubject,
      required: [true, "please provide a subject"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, "please provide a user_id"],
      ref: "student",
    },
    class_id: {
      type: String,
      required: [true, "please provide a class_id"],
      ref: "classroom",
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      required: [true, "please provide a teacher id"],
      ref: "teacher",
    },
    assignment_score: { default: 0, type: Number },
    mid_term_score: { default: 0, type: Number },
    semester_score: { default: 0, type: Number },
    tahun_ajaran: {
      type: String,
      required: [true, "please provide tahun ajaran"],
    },
  },
  { versionKey: false }
);
gradeSchema.index(
  { subject: 1, user_id: 1, tahun_ajaran: 1, teacher_id: 1 },
  { unique: true }
);
const Grade = model<IGrade, GradeModel>("grade", gradeSchema);
export default Grade;
