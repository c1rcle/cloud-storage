import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import fs from "fs";
import { StorageClient } from "./StorageClient.js";
import { writeStreamToFile } from "../utils/StreamUtils.js";
import { measureExecutionTime, measureTransferTime } from "../utils/BenchmarkingUtils.js";

export interface S3Options {
  accessKeyId: string;
  accessKeySecret: string;
  bucketName: string;
}

const getS3Client = async (options: S3Options): Promise<StorageClient> => {
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.accessKeySecret,
    },
  });

  return {
    downloadFile: async file => {
      const command = new GetObjectCommand({
        Bucket: options.bucketName,
        Key: file.remoteFilePath,
      });

      return await measureTransferTime(file.size, async () => {
        const { Body } = await s3Client.send(command);
        await writeStreamToFile(Body, file.downloadFilePath);
      });
    },
    uploadFile: async file => {
      const command = new PutObjectCommand({
        Bucket: options.bucketName,
        Key: file.remoteFilePath,
        Body: fs.createReadStream(file.sourceFilePath),
      });

      return await measureTransferTime(file.size, async () => {
        await s3Client.send(command);
      });
    },
    deleteFile: async file => {
      const command = new DeleteObjectCommand({
        Bucket: options.bucketName,
        Key: file.remoteFilePath,
      });

      return await measureExecutionTime(async () => {
        await s3Client.send(command);
      });
    },
  };
};

export default getS3Client;
