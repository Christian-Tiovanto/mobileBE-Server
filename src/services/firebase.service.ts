import { Bucket } from "@google-cloud/storage";
import * as fileType from "file-type";
import { getStorage } from "firebase-admin/storage";
import { extname, join } from "path";
import AppError from "../utils/appError";
import multer from "multer";
const storage = multer.memoryStorage();
import admin from "firebase-admin";

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
}
