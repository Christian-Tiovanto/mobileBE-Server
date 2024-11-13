import { Bucket } from "@google-cloud/storage";
import * as fileType from "file-type";
import { getStorage } from "firebase-admin/storage";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { extname, join } from "path";
import AppError from "../utils/appError";
import multer from "multer";
const storage = multer.memoryStorage();
import admin from "firebase-admin";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";

admin.initializeApp({
  credential: admin.credential.cert(
    join(process.cwd(), "cdn-db-service-account.json")
  ),
  storageBucket: "cdn-db-aa49f.appspot.com",
});

export class FirebaseService {
  storageBucket: Bucket;

  constructor() {
    this.storageBucket = getStorage().bucket();
  }

  async uploadPhoto(file: Express.Multer.File, fileName: string) {
    console.log(
      `.${(await fileType.fromBuffer(file.buffer)).ext}` !=
        extname(file.originalname)
    );
    console.log("`.${(await fileType.fromBuffer(file.buffer)).ext}`");
    console.log(`.${(await fileType.fromBuffer(file.buffer)).ext}`);
    console.log(extname(file.originalname));
    if (
      `.${(await fileType.fromBuffer(file.buffer)).ext}` !=
      extname(file.originalname)
    )
      throw new AppError("you can only attach image/ file", 400);
    await this.storageBucket
      .file(fileName, {
        preconditionOpts: {
          ifGenerationMatch: 0,
        },
      })
      .save(file.buffer);
  }

  async getPhoto(fileName: string) {
    const [photo] = await this.storageBucket.getFiles({
      prefix: fileName,
    });
    return await photo[0].download();
  }

  async deletePhoto(fileName: string) {
    const [metadata] = await this.storageBucket.file(fileName).getMetadata();
    await this.storageBucket.file(fileName).delete({
      ifGenerationMatch: metadata.generation,
    });
  }

  async signUpStudent(createStudentDto: CreateStudentDto) {
    const userRecord = await getAuth().createUser({
      email: createStudentDto.email,
      phoneNumber: `+62${createStudentDto.phone_number}`,
      password: createStudentDto.password,
      displayName: createStudentDto.name,
    });
    console.log("Successfully created new user:", userRecord.uid);
    return userRecord;
  }
  async signUpTeacher(createTeacherDto: CreateTeacherDto) {
    const userRecord = await getAuth().createUser({
      email: createTeacherDto.email,
      phoneNumber: `+62${createTeacherDto.phone_number}`,
      password: createTeacherDto.password,
      displayName: createTeacherDto.name,
    });
    console.log("Successfully created new user:", userRecord.uid);
    return userRecord;
  }

  async getUser(email: string) {
    const userrecord = await getAuth().getUserByEmail(email);
    console.log(userrecord);
    return userrecord;
  }
}
