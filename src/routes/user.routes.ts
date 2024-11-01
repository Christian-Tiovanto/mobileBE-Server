import express from "express";
import { JoiValidatoinMiddleware } from "../middlewares/joi-validation.middleware";
import { UserController } from "../controllers/user.controller";
import { CreateUserDto } from "../dtos/create-user.dto";
const userRouter = express.Router();
const userController = new UserController();
userRouter.post(
  "/",
  JoiValidatoinMiddleware(CreateUserDto),
  userController.createUser()
);
export default userRouter;
