import { LoginDto } from "../dtos/login.dto";
import User, { UserDocument } from "../models/UserModel";
import AppError from "../utils/appError";
import * as jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import { CreateUserDto } from "../dtos/create-user.dto";
const userService = new UserService();
export class AuthService {
  constructor() {}
  private signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  }

  private sendToken(user: UserDocument, statusCode, req, res) {
    const token = this.signToken(user.user_id);

    res.cookie("jwt", token);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const { user_id, password } = loginDto;
    const user = await this.findUserByUserId(user_id);
    await user.correctPassword(password, user.password);
    const token = await this.signToken(user.user_id);
    return { user, token };
  }
  async signUp(createUserDto: CreateUserDto) {
    const { user_id, password } = createUserDto;
    const user = await User.findOne({ user_id }).select("+password");
    if (user)
      throw new AppError("user_id already exist, use another user_id", 400);
    const newUser = await userService.createUser(createUserDto);
    const token = await this.signToken(newUser.user_id);
    return { newUser, token };
  }

  private async findUserByUserId(userId: string) {
    const user = await User.findOne({ user_id: userId }).select("+password");
    if (!user) throw new AppError("no user with that id", 404);
    return user;
  }
}
