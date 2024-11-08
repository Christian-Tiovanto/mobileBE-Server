import { Response } from "express";
import fileType from "file-type";

export const sendBinaryWithMimeType = async (
  res: Response,
  binary: Buffer
): Promise<void> => {
  const ricFileType = await fileType.fromBuffer(binary);
  res.contentType(ricFileType!.mime).send(binary);
};
