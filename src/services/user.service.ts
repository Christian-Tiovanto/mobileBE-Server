import { Types } from "mongoose";
import { CreateUserDto } from "../dtos/create-user.dto";
import User from "../models/UserModel";
import AppError from "../utils/appError";

export class UserService {
  constructor() {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await User.create(createUserDto);
    console.log("wywaa");
    console.log(user);
    await user.save();
    return user;
  }
  async findUserByUserId(userId: string) {
    const user = await User.findOne({ _id: userId }).select("+password");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }

  async getUsersByClassId(classId: string) {
    const users1 = await User.find();
    const users = await User.find({ class_id: new Types.ObjectId(classId) });
    console.log(users);
    return users;
  }
}
