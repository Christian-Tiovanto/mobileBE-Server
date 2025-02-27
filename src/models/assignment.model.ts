import { HydratedDocument, Model, model, Schema, Types } from "mongoose";

export interface IAssignment {
  due_date: Date;
  class_id: string;
  title: string;
  description: string;
  tahun_ajaran: string;
  subject: string;
  teacher_id: Types.ObjectId;
  file_url: string;
}

export type AssignmentModel = Model<IAssignment, {}>;
export type AssignmentDocument = HydratedDocument<IAssignment>;
const assingmentSchema = new Schema<IAssignment, AssignmentModel>(
  {
    title: {
      type: String,
      required: [true, "please provide a title for assignment"],
    },
    due_date: {
      type: Date,
      required: [true, "please provide the date of attendance"],
    },
    class_id: {
      type: String,
      required: [true, "please provide a class id"],
      ref: "classrooms",
    },
    subject: {
      type: String,
      required: [true, "please provide a subject"],
      ref: "classrooms",
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      required: [true, "please provide a teacher id"],
      ref: "teacher",
    },
    description: {
      type: String,
    },
    tahun_ajaran: {
      type: String,
      required: [true, "please provide tahun ajaran"],
    },
    file_url: String,
  },
  { versionKey: false }
);

const Assignment = model<IAssignment, AssignmentModel>(
  "assignment",
  assingmentSchema
);
export default Assignment;
