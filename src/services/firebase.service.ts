import { Bucket } from "@google-cloud/storage";
import * as fileType from "file-type";
import { getStorage } from "firebase-admin/storage";
import { getAuth } from "firebase-admin/auth";
import { extname, join } from "path";
import AppError from "../utils/appError";
import multer from "multer";
const storage = multer.memoryStorage();
import admin from "firebase-admin";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";

console.log(`join(process.cwd(), "cdn-db-service-account.json")`);
console.log(join(process.cwd(), "cdn-db-service-account.json"));
admin.initializeApp({
  credential: admin.credential.cert(
    join(process.cwd(), "cdn-db-service-account.json")
  ),
  storageBucket: "cdn-db-aa49f.appspot.com",
});
const db = admin.firestore();
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
    if (extname(file.originalname) == ".jpeg") {
      file.originalname = file.originalname.replace(".jpeg", ".jpg");
    }
    if (
      `.${(await fileType.fromBuffer(file.buffer)).ext}` !=
      extname(file.originalname)
    )
      throw new AppError("you can only attach image/ file", 400);
    await this.storageBucket.file(fileName, {}).save(file.buffer);
  }
  async uploadFile(file: Express.Multer.File, fileName: string) {
    await this.storageBucket.file(fileName, {}).save(file.buffer);
  }

  async getFile(fileName: string) {
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

  async deleteAllUsersFirebase() {
    try {
      // List users in batches (max 1000 at a time)
      const listUsersResult = await admin.auth().listUsers(1000);

      // Delete each user in the current batch
      const deletePromises = listUsersResult.users.map((userRecord) =>
        admin.auth().deleteUser(userRecord.uid)
      );

      // Wait for all deletions to complete
      await Promise.all(deletePromises);
      console.log(`Successfully deleted ${listUsersResult.users.length} users`);

      // Continue with next page if there are more users
      if (listUsersResult.pageToken) {
        await this.deleteAllUsersFirebase();
      } else {
        console.log("All users have been deleted");
      }
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  }

  async deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    if (snapshot.empty) {
      resolve();
      return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // Recursively delete the next batch
    process.nextTick(() => {
      this.deleteQueryBatch(db, query, resolve);
    });
  }
  async deleteCollection(collectionPath, batchSize = 100) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.limit(batchSize);

    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }
  async deleteAllData() {
    const collections = await db.listCollections();
    for (const collection of collections) {
      console.log(`Deleting collection: ${collection.id}`);
      await this.deleteCollection(collection.id);
    }
    console.log("All data deleted.");
  }

  async signUpStudent(createStudentDto: CreateStudentDto) {
    const userFirestore = await db.collection("student").add(createStudentDto);
    const userRecord = await getAuth().createUser({
      email: createStudentDto.email,
      phoneNumber: `+62${createStudentDto.phone_number}`,
      password: createStudentDto.password,
      displayName: createStudentDto.name,
    });
    return userRecord;
  }
  async signUpTeacher(createTeacherDto: CreateTeacherDto) {
    const teacherFirestore = await db
      .collection("teacher")
      .add(createTeacherDto);
    const teacherRecord = await getAuth().createUser({
      email: createTeacherDto.email,
      phoneNumber: `+62${createTeacherDto.phone_number}`,
      password: createTeacherDto.password,
      displayName: createTeacherDto.name,
    });
    console.log("Successfully created new user:", teacherRecord.uid);
    return teacherRecord;
  }

  async getUserStudent(email: string) {
    const userRecord = await getAuth().getUserByEmail(email);
    const userCollection = db.collection("student");
    const snapshot = await userCollection.where("email", "==", email).get();
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
    return userRecord;
  }
  async getUserTeacher(email: string) {
    const userRecord = await getAuth().getUserByEmail(email);
    const userCollection = db.collection("teacher");
    const snapshot = await userCollection.where("email", "==", email).get();
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
    return userRecord;
  }
}
