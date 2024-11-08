import { HydratedDocument, Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserRole } from "../enums/user-role";

export interface IStudent {
  name: string;
  user_id: string;
  password: string;
  phone_number: string;
  class_id: string;
  role: UserRole;
  tahun_ajaran: string;
  photo_url: string;
}

interface IStudentMethods {
  correctPassword(candidatePassword: string, userPassword: string): boolean;
}
export type StudentModel = Model<IStudent, {}, IStudentMethods>;
export type StudentDocument = HydratedDocument<IStudent>;
const studentSchema = new Schema<IStudent, StudentModel, IStudentMethods>(
  {
    name: String,
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
      type: String,
      ref: "classrooms",
      default: null,
    },
    role: {
      type: String,
      default: UserRole.STUDENT,
    },
    tahun_ajaran: {
      type: String,
      required: [true, "Please provide tahun ajaran"],
    },
    photo_url: String,
  },
  { versionKey: false }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

studentSchema.method(
  "correctPassword",
  async function correctPassword(
    candidatePassword: string,
    userPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
);
const Student = model<IStudent, StudentModel>("student", studentSchema);
export default Student;
