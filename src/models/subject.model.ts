import mongoose, {
  HydratedDocument,
  Model,
  model,
  Schema,
  Types,
} from "mongoose";
import { GradeSubject } from "../enums/grade-list";

export interface ISubject {
  _id: string;
}

export type SubjectModel = Model<ISubject, {}>;
export type SubjectDocument = HydratedDocument<ISubject>;
const subjectSchema = new Schema<ISubject, SubjectModel>(
  {
    _id: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
const Subject = model<ISubject, SubjectModel>("subject", subjectSchema);
export default Subject;
