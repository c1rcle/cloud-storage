import { Storage } from "@google-cloud/storage";
import { StorageClient } from "./StorageClient.js";
import { measureExecutionTime, measureTransferTime } from "../utils/BenchmarkingUtils.js";

export interface CloudStorageOptions {
  projectId: string;
  keyFile: string;
  bucketName: string;
}

const getCloudStorageClient = async (options: CloudStorageOptions): Promise<StorageClient> => {
  const bucket = new Storage({
    projectId: options.projectId,
    keyFilename: options.keyFile,
  }).bucket(options.bucketName);

  return {
    downloadFile: async file => {
      return await measureTransferTime(file.size, async () => {
        await bucket.file(file.remoteFilePath).download({ destination: file.downloadFilePath });
      });
    },
    uploadFile: async file => {
      return await measureTransferTime(file.size, async () => {
        await bucket.upload(file.sourceFilePath, { destination: file.remoteFilePath });
      });
    },
    deleteFile: async file => {
      return await measureExecutionTime(async () => {
        await bucket.file(file.remoteFilePath).delete();
      });
    },
  };
};

export default getCloudStorageClient;
