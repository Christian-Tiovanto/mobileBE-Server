import mongoose, { HydratedDocument, Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserRole } from "../enums/user-role";
import { Types } from "mongoose";
import { AttendanceStatus } from "../enums/attendance-status";

export interface IAnnouncement {
  file_url: string;
  title?: string;
  description?: string;
  date?: string;
}

export type AnnouncementModel = Model<IAnnouncement, {}>;
export type AnnouncementDocument = HydratedDocument<IAnnouncement>;
const announcementSchema = new Schema<IAnnouncement, AnnouncementModel>(
  {
    file_url: {
      type: String,
      required: [true, "need a file url"],
    },
    title: {
      default: null,
      type: String,
    },
    description: {
      default: null,
      type: String,
    },
    date: {
      default: null,
      type: String,
    },
  },
  { versionKey: false }
);

const Announcement = model<IAnnouncement, AnnouncementModel>(
  "announcement",
  announcementSchema
);
export default Announcement;
