import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { getClassSchema, JoiSchemaOptions } from "joi-class-decorators";
import AppError from "../utils/appError";

export function JoiValidationMiddleware({
  classBodyType,
  classQueryType,
}: {
  classBodyType?: any;
  classQueryType?: any;
}) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("masok sini?");
      if (Object.keys(req.body).length !== 0) {
        const schema = getClassSchema(classBodyType);
        Joi.assert({ ...req.body }, schema);
      }
      if (Object.keys(req.query).length !== 0) {
        const schemaQuery = getClassSchema(classQueryType);
        Joi.assert({ ...req.query }, schemaQuery);
      }
    } catch (err: any) {
      return next(new AppError(err.details[0].message, 400));
    }

    return next();
  };
}
