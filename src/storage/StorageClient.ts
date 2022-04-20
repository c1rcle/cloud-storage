import { TestFile } from "../files/fileUtils.js";
import { TransferRequestResult } from "./RequestResult.js";

export interface StorageClient {
  downloadFile(file: TestFile): Promise<TransferRequestResult>;
  uploadFile(file: TestFile): Promise<TransferRequestResult>;
  deleteFile(file: TestFile): Promise<number>;
}
