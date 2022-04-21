import { ArgumentsCamelCase, CommandModule } from "yargs";
import getS3Client from "../storage/S3Client.js";
import storageBenchmark from "../storage/StorageBenchmark.js";
import { applyBenchmarkOptions, BenchmarkOptions } from "./BenchmarkOptions.js";

export interface S3Options {
  accessKeyId: string;
  accessKeySecret: string;
  bucketName: string;
}

type CommandOptions = ArgumentsCamelCase & S3Options & BenchmarkOptions;

const benchmarkS3Command: CommandModule = {
  command: "benchmark-s3 <file-sizes...>",
  describe: "Run a benchmark of the AWS S3 service",
  builder: yargs =>
    // prettier-ignore
    applyBenchmarkOptions(yargs)
      .option("access-key-id", {
        type: "string",
        describe: "Access key identifier",
        demandOption: true
      })
      .option("access-key-secret", {
        type: "string",
        describe: "Access key secret",
        demandOption: true
      })
      .option("bucket-name", {
        type: "string",
        describe: "Test bucket name",
        default: "test"
      }),
  handler: async args => {
    const options = args as CommandOptions;
    await storageBenchmark(options, getS3Client(options));
  },
};

export default benchmarkS3Command;
