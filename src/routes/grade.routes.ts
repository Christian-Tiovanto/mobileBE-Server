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
  "/:user_id/subject/:subject/class/:class_id/tahun/:tahun_ajaran",
  JoiValidationMiddleware({ classBodyType: UpdateGradeDto }),
  gradeController.updateGradeByUserIdNTahun()
);
gradeRouter.get(
  "/:user_id/subject/:subject/class/:class_id/tahun/:tahun_ajaran",
  gradeController.findGradeByUserIdnTahunNSubPopulate()
);
gradeRouter.get(
  "/:user_id/class/:class_id/tahun/:tahun_ajaran",
  gradeController.getStudentNItsGrade()
);
gradeRouter.get("/subject", gradeController.getSubjectList());
export default gradeRouter;
