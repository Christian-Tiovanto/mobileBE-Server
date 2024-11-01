import { CreateUserDto } from "../dtos/create-user.dto";
import User from "../models/UserModel";
import AppError from "../utils/appError";

export class UserService {
  constructor() {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await User.create(createUserDto);
    await user.save();
    return user;
  }
  async findUserByUserId(userId: string) {
    const user = await User.findOne({ _id: userId }).select("+password");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }
}
