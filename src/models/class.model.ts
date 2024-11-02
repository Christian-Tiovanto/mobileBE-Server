import mongoose, { HydratedDocument, Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserRole } from "../enums/user-role";
import { Types } from "mongoose";
import { AttendanceStatus } from "../enums/attendance-status";

export interface IClassroom {
  _id: string;
}

export type ClassroomModel = Model<IClassroom, {}>;
export type ClassroomDocument = HydratedDocument<IClassroom>;
const classroomSchema = new Schema<IClassroom, ClassroomModel>(
  {
    _id: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, _id: false }
);

const Classroom = model<IClassroom, ClassroomModel>(
  "classroom",
  classroomSchema
);
export default Classroom;
