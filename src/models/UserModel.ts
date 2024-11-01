import mongoose, { HydratedDocument, Model, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserRole } from "../enums/user-role";

export interface IUser {
  name: string;
  user_id: string;
  password: string;
  phone_number: string;
  role: UserRole;
}

interface IUserMethods {
  correctPassword(candidatePassword: string, userPassword: string): boolean;
}
export type UserModel = Model<IUser, {}, IUserMethods>;
export type UserDocument = HydratedDocument<IUser>;
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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
    },
    role: {
      type: String,
      enum: UserRole,
      required: [true, "User need a role"],
    },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.method(
  "correctPassword",
  async function correctPassword(
    candidatePassword: string,
    userPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
);
const User = model<IUser, UserModel>("User", userSchema);
export default User;
