import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { getClassSchema, JoiSchemaOptions } from "joi-class-decorators";
import AppError from "../utils/appError";

export function JoiValidatoinMiddleware(classType: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = getClassSchema(classType);
      Joi.assert({ ...req.body }, schema);
    } catch (err: any) {
      return next(new AppError(err.details[0].message, 400));
    }

    return next();
  };
}
