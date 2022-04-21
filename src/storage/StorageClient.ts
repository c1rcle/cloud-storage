import { TestFile } from "../files/fileUtils.js";

export interface TransferRequestResult {
  timeElapsed: number;
  averageMbps: number;
}

export interface StorageClient {
  downloadFile(file: TestFile): Promise<TransferRequestResult>;
  uploadFile(file: TestFile): Promise<TransferRequestResult>;
  deleteFile(file: TestFile): Promise<number>;
}
