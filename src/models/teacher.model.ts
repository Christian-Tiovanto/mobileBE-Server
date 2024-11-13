import { HydratedDocument, Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { GradeSubject } from "../enums/grade-list";
import { UserRole } from "../enums/user-role";

export interface ITeacher {
  name: string;
  user_id: string;
  email: string;
  password: string;
  phone_number: string;
  class_id: string[];
  enrollment_date: Date;
  role: UserRole;
  subject_teach: GradeSubject[];
  homeroom_class: string;
  photo_url: string;
}

export interface ITeacherMethods {
  correctPassword(candidatePassword: string, userPassword: string): boolean;
}
export type TeacherModel = Model<ITeacher, {}, ITeacherMethods>;
export type TeacherDocument = HydratedDocument<ITeacher>;
const teacherSchema = new Schema<ITeacher, TeacherModel, ITeacherMethods>(
  {
    name: String,
    email: {
      type: String,
      required: [true, "please provide a email"],
      unique: true,
    },
    user_id: {
      type: String,
      required: [true, "please provide a user id"],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, "please provide a password"],
    },
    phone_number: {
      type: String,
      required: [true, "Please provide a phone number"],
      select: false,
      unique: true,
    },
    class_id: {
      type: [String],
      ref: "classroom",
      default: [],
    },
    homeroom_class: {
      type: String,
      ref: "classroom",
      default: null,
    },
    enrollment_date: {
      type: Date,
      required: [true, "please provide enrollment date"],
    },
    subject_teach: {
      type: [String],
      default: [],
      enum: GradeSubject,
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.TEACHER,
    },
    photo_url: String,
  },
  { versionKey: false }
);

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

teacherSchema.method(
  "correctPassword",
  async function correctPassword(
    candidatePassword: string,
    userPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
);
const Teacher = model<ITeacher, TeacherModel>("teacher", teacherSchema);
export default Teacher;
