import { CreateUserDto } from "../dtos/create-user.dto";
import User from "../models/UserModel";

export class UserService {
  constructor() {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await User.create(createUserDto);
    return user;
  }
}
