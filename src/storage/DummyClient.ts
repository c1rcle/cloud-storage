import fs from "fs-extra";
import { StorageClient } from "./StorageClient.js";
import { DummyOptions } from "../yargs/BenchmarkDummyCommand.js";
import { measureExecutionTime, measureTransferTime } from "../utils/BenchmarkingUtils.js";

const sleep = (seconds: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const getDummyClient = (options: DummyOptions): StorageClient => {
  return {
    downloadFile: async file => {
      return await measureTransferTime(file.size, async () => {
        fs.copyFileSync(file.sourceFilePath, file.downloadFilePath);
        await sleep(options.downloadTime);
      });
    },
    uploadFile: async file => {
      return await measureTransferTime(file.size, async () => {
        await sleep(options.uploadTime);
      });
    },
    deleteFile: async () => {
      return await measureExecutionTime(async () => {
        await sleep(options.deleteTime);
      });
    },
  };
};

export default getDummyClient;
