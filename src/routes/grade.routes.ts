import express from "express";
import { JoiValidationMiddleware } from "../middlewares/joi-validation.middleware";
import { CreateClassroomDto } from "../dtos/create-classroom.dto";
import { GradeController } from "../controllers/grade.controller";
import { CreateGradeBulkDto } from "../dtos/create-grade.dto";
import { UpdateGradeDto } from "../dtos/update-grade.dto";
import { verifyJWT } from "../guards/authentication.guard";
import { UpdateGradeScoreBulkDto } from "../dtos/update-grade-bulk.dto";
import { CreateGradeDto } from "../dtos/create-grade.dto-one";
const gradeRouter = express.Router();
const gradeController = new GradeController();
gradeRouter.post(
  "/bulk",
  JoiValidationMiddleware({ classBodyType: CreateGradeBulkDto }),
  gradeController.createEmptyGradeBulk()
);
gradeRouter.post(
  "/",
  JoiValidationMiddleware({ classBodyType: CreateGradeDto }),
  gradeController.createEmptyGrade()
);
gradeRouter.patch(
  "/:user_id/subject/:subject/class/:class_id/tahun/:tahun_ajaran",
  JoiValidationMiddleware({ classBodyType: UpdateGradeDto }),
  gradeController.updateGradeByUserIdNTahun()
);
gradeRouter.patch(
  "/score/bulk",
  JoiValidationMiddleware({ classBodyType: UpdateGradeScoreBulkDto }),
  gradeController.updateGradeScoreBulk()
);
gradeRouter.get(
  "/:user_id/subject/:subject/class/:class_id/tahun/:tahun_ajaran",
  gradeController.findGradeByUserIdnTahunNSubPopulate()
);
gradeRouter.get(
  "/class/:class_id/teacher-teach",
  verifyJWT(),
  gradeController.getAllGradeByClassNPopulate()
);
gradeRouter.get(
  "/:user_id/class/:class_id/tahun/:tahun_ajaran",
  gradeController.getStudentNItsGrade()
);
gradeRouter.get(
  "/my-grade",
  verifyJWT(),
  gradeController.getLoggedInStudentGrade()
);
gradeRouter.get("/subject", gradeController.getSubjectList());
export default gradeRouter;
