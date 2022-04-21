import fs from "fs-extra";
import chalk from "chalk";
import { SingleBar, Presets } from "cli-progress";
import getTestFileGenerator from "../files/fileUtils.js";
import { BenchmarkOptions } from "../yargs/BenchmarkOptions.js";
import { StorageClient, TransferRequestResult } from "./StorageClient.js";
import { megabytesToBytes } from "../utils/BenchmarkingUtils.js";
import { mapSeries } from "../utils/AsyncUtils.js";

export interface BenchmarkResult {
  fileSize: number;
  uploadResults: TransferRequestResult[];
  downloadResults: TransferRequestResult[];
  deleteResults: number[];
}

const storageBenchmark = async (options: BenchmarkOptions, client: StorageClient) => {
  const testFileGenerator = getTestFileGenerator();

  const progress = new SingleBar({}, Presets.legacy);

  const runTest = async (): Promise<BenchmarkResult[]> => {
    return await mapSeries(options.fileSizes, async size => {
      const testFile = testFileGenerator.createTestFile(megabytesToBytes(size));

      const uploadResults: TransferRequestResult[] = [];
      const downloadResults: TransferRequestResult[] = [];
      const deleteResults: number[] = [];

      console.log(`Starting test for file with size ${size} MB`);
      progress.start(options.iterations, 0);

      for (let i = 0; i < options.iterations; i++) {
        uploadResults.push(await client.uploadFile(testFile));
        downloadResults.push(await client.downloadFile(testFile));
        deleteResults.push(await client.deleteFile(testFile));

        fs.rmSync(testFile.downloadFilePath);
        progress.increment();
      }

      progress.stop();

      return {
        fileSize: size,
        uploadResults: uploadResults,
        downloadResults: downloadResults,
        deleteResults: deleteResults,
      };
    });
  };

  try {
    fs.writeJSONSync(options.outputFilePath, await runTest());
    console.log(chalk.green(`\u2705 Wrote results to ${options.outputFilePath}`));
  } finally {
    testFileGenerator.deleteTempFiles();
  }
};

export default storageBenchmark;
