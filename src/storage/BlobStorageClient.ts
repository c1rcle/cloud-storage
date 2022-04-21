import { BlobServiceClient } from "@azure/storage-blob";
import { StorageClient } from "./StorageClient.js";
import { BlobStorageOptions } from "../yargs/BenchmarkBlobStorageCommand.js";
import { measureExecutionTime, measureTransferTime } from "../utils/BenchmarkingUtils.js";

// prettier-ignore
const getBlobStorageClient = (options: BlobStorageOptions): StorageClient => {
  const containerClient = BlobServiceClient
    .fromConnectionString(options.connectionString)
    .getContainerClient(options.containerName);

  return {
    downloadFile: async file => {
      return await measureTransferTime(file.size, async () => {
        await containerClient
          .getBlockBlobClient(file.remoteFilePath)
          .downloadToFile(file.downloadFilePath);
      });
    },
    uploadFile: async file => {
      return await measureTransferTime(file.size, async () => {
        await containerClient
          .getBlockBlobClient(file.remoteFilePath)
          .uploadFile(file.sourceFilePath);
      });
    },
    deleteFile: async file => {
      return await measureExecutionTime(async () => {
        await containerClient.deleteBlob(file.remoteFilePath);
      });
    },
  };
};

export default getBlobStorageClient;
