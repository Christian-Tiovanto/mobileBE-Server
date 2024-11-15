import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/student.service";
import catchAsync from "../utils/catch-async";
import { extname } from "path";
import { FirebaseService } from "../services/firebase.service";
const firebaseService = new FirebaseService();
const studentService = new StudentService();
export class StudentController {
  constructor() {}

  updateStudent() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const user = await studentService.updateStudentById(
          req.params.student_id,
          req.body
        );
        delete user.password;
        res.status(200).json({
          status: "success",
          data: user,
        });
      }
    );
  }

  uploadStudentPhotoById() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const student = await studentService.uploadStudentPhotoById(
          req.params.student_id,
          req
        );
        res.status(200).json({
          status: "success",
          data: student,
        });
      }
    );
  }

  getStudentPhotoById() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const data = await studentService.getStudentPhotoById(
          req.params.student_id
        );
        res.set(
          "Content-Type",
          `image/${extname(data.student.photo_url).substring(1)}`
        );
        res.send(data.photo[0]);
      }
    );
  }

  getStudentsByClassId() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const students = await studentService.getStudentsByClassId(
          req.params.class_id
        );
        res.status(200).json({
          status: "success",
          data: students,
        });
      }
    );
  }

  tesSignUpFirebase() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const tes = await firebaseService.signUpStudent(req.body);
        res.status(201).json({
          status: "success",
          data: tes,
        });
      }
    );
  }

  getAllStudent() {
    return catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const students = await studentService.getAllStudent();
        res.status(200).json({
          status: "success",
          data: students,
        });
      }
    );
  }
  // tesGetFirebase() {
  //   return catchAsync(
  //     async (req: Request, res: Response, next: NextFunction) => {
  //       const tes = await firebaseService.getUser();
  //       res.status(200).json({
  //         status: "success",
  //         data: tes,
  //       });
  //     }
  //   );
  // }
}
