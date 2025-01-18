import { JoiSchema, JoiSchemaOptions } from "joi-class-decorators";
import Joi from "joi";
import { IAssignment } from "../models/assignment.model";
import { IAnnouncement } from "../models/announcement.model";

@JoiSchemaOptions({ allowUnknown: false })
export class CreateAnnouncementDto implements IAnnouncement {
  file_url: string;

  @JoiSchema(Joi.string().allow("").optional())
  title?: string;

  @JoiSchema(Joi.string().allow("").optional())
  description?: string;

  @JoiSchema(Joi.string().allow("").optional())
  date?: string;
}
