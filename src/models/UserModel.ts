import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  name: string;
  password: string;
  phone_number: string;
}
const userSchema = new Schema<IUser>({
  name: String,
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
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = model<IUser>("User", userSchema);
export default User;
