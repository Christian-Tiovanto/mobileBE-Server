import mongoose, { HydratedDocument, Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserRole } from "../enums/user-role";
import { Types } from "mongoose";
import { AttendanceStatus } from "../enums/attendance-status";

export interface IAttendance {
  user_id: Types.ObjectId;
  status: AttendanceStatus;
  date: Date;
  class_id: string;
  reason: string;
  tahun_ajaran: string;
}

export type AttendanceModel = Model<IAttendance, {}>;
export type AttendanceDocument = HydratedDocument<IAttendance>;
const attendanceSchema = new Schema<IAttendance, AttendanceModel>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, "please provide a user_id"],
      ref: "students",
    },
    status: {
      type: String,
      enum: AttendanceStatus,
      required: [true, "please provide the status"],
    },
    date: {
      type: Date,
      required: [true, "please provide the date of attendance"],
    },
    class_id: {
      type: String,
      required: [true, "please provide a class id"],
      ref: "classrooms",
    },
    tahun_ajaran: {
      type: String,
      required: [true, "please provide tahun ajaran"],
    },
    reason: String,
  },
  { versionKey: false }
);

const Attendance = model<IAttendance, AttendanceModel>(
  "attendance",
  attendanceSchema
);
export default Attendance;
