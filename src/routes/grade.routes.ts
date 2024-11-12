import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { CreateClassroomDto } from "../dtos/create-classroom.dto";
import { GradeController } from "../controllers/grade.controller";
import { CreateGradeDto } from "../dtos/create-grade.dto";
import { UpdateGradeDto } from "../dtos/update-grade.dto";
const gradeRouter = express.Router();
const gradeController = new GradeController();
gradeRouter.post(
  "/bulk",
  JoiValidationMiddleware({ classBodyType: CreateGradeDto }),
  gradeController.createEmptyGradeBulk()
);
gradeRouter.patch(
  "/:user_id/subject/:subject/tahun/:tahun_ajaran",
  JoiValidationMiddleware({ classBodyType: UpdateGradeDto }),
  gradeController.updateGradeByUserIdNTahun()
);
gradeRouter.get("/subject", gradeController.getSubjectList());
export default gradeRouter;
