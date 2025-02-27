import { extname } from "path";
import { CreateStudentAssignmentDto } from "../dtos/create-student-assignment.dto";
import Submission, { SubmissionModel } from "../models/submission.model";
import AppError from "../utils/appError";
import { StudentAssignmentStatus } from "../enums/student-assignment-status";
import { FirebaseService } from "./firebase.service";
import * as fileType from "file-type";
import { UpdateSubmissionScoreDto } from "../dtos/update-submission-score.dto";
import mongoose from "mongoose";
import { GradeService } from "./grade.service";

const gradeService = new GradeService();
const firebaseService = new FirebaseService();
export class SubmissionService {
  constructor() {}

  async createSubmissionBulk(
    createStudentAssignmentDto: CreateStudentAssignmentDto[]
  ) {
    const assignments = await Submission.create(createStudentAssignmentDto);
    return assignments;
  }

  async uploadSubmissionFile(
    assignmentId: string,
    studentId: string,
    file: Express.Multer.File
  ) {
    const submission: any = await Submission.findOne({
      assignment_id: assignmentId,
      student_id: studentId,
    }).populate("assignment_id");
    if (!submission) {
      throw new AppError("no submission found", 404);
    }
    if (file) {
      const type = await fileType.fromBuffer(file.buffer);
      if (
        !(type.mime === "application/pdf" || type.mime.startsWith("image/"))
      ) {
        throw new AppError(
          "cant upload file other than image type and pdf",
          400
        );
      }
      console.log("file di assignments");
      console.log(file);
      console.log(submission);
      const fileName = `${submission._id}${extname(file.originalname)}`;
      const key = `student-assignment/${fileName}`;
      submission.file_url = fileName;
      await firebaseService.uploadFile(file, key);
    }
    submission.status = StudentAssignmentStatus.CLOSED;
    submission.submission_time = new Date();
    await submission.save();
    return submission;
  }

  async updateSubmissionScore(
    submissionId: string,
    updateSubmissionScoreDto: UpdateSubmissionScoreDto
  ) {
    console.log("submissionId di updateSubmissionScore");
    console.log(submissionId);
    const submission: any = await this.findSubmissionById(submissionId);
    submission.score = updateSubmissionScoreDto.score;
    const allSubmission = await Submission.find({
      student_id: submission.student_id,
      class_id: submission.class_id,
    });
    const grade = await gradeService.findGradeByClassIdNUserIdN(
      submission.student_id.toString(),
      "2023",
      submission.assignment_id.subject,
      submission.class_id
    );
    const oldTotalAssignmentScore = allSubmission.reduce(
      (accumulator, currentValue) => accumulator + currentValue.score,
      0
    );
    grade.assignment_score =
      (oldTotalAssignmentScore + updateSubmissionScoreDto.score) /
      allSubmission.length;
    console.log(oldTotalAssignmentScore);
    console.log(updateSubmissionScoreDto.score);
    await submission.save();
    await grade.save();
    return submission;
  }

  async findSubmissionById(id: string) {
    const studentAssignment = await Submission.findById(id).populate(
      "assignment_id"
    );
    if (!studentAssignment) {
      throw new AppError("no submission with that id", 404);
    }
    return studentAssignment;
  }
  async getSubmissionByAssignmentId(id: string) {
    const studentAssignment = await Submission.find({
      assignment_id: id,
      status: StudentAssignmentStatus.CLOSED,
    }).populate({ path: "student_id", select: "name" });

    return studentAssignment;
  }
  async getAllStudentAssignmentByOpenSubmission(studentId: string) {
    const assignment = await Submission.aggregate([
      {
        $match: {
          student_id: new mongoose.Types.ObjectId(studentId),
          status: StudentAssignmentStatus.OPEN,
        },
      },
      {
        $lookup: {
          from: "assignments",
          localField: "assignment_id",
          foreignField: "_id",
          as: "assignment_id",
        },
      },
      {
        $unwind: {
          path: "$assignment_id",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          assignment_id: 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: "$assignment_id",
        },
      },
    ]);
    return assignment;
  }

  async getSubmissionFileById(id: string) {
    const assignment = await this.findSubmissionById(id);
    const key = `student-assignment/${assignment.file_url}`;
    const file = await firebaseService.getFile(key);
    return file;
  }
}
