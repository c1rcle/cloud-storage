import { ArgumentsCamelCase, CommandModule } from "yargs";
import getCloudStorageClient from "../storage/CloudStorageClient.js";
import storageBenchmark from "../storage/StorageBenchmark.js";
import { applyBenchmarkOptions, BenchmarkOptions } from "./BenchmarkOptions.js";

export interface CloudStorageOptions {
  projectId: string;
  keyFile: string;
  bucketName: string;
}

type CommandOptions = ArgumentsCamelCase & BenchmarkOptions & CloudStorageOptions;

const benchmarkCloudStorageCommand: CommandModule = {
  command: "benchmark-cloud-storage <file-sizes...>",
  describe: "Run a benchmark of the GCP Cloud Storage service",
  builder: yargs =>
    // prettier-ignore
    applyBenchmarkOptions(yargs)
      .option("project-id", {
        type: "string",
        describe: "GCP project identifier",
        demandOption: true
      })
      .option("key-file", {
        type: "string",
        describe: "Path to an authentication key file",
        demandOption: true,
      })
      .option("bucket-name", {
        type: "string",
        describe: "Test bucket name",
        default: "test"
      }),
  handler: async args => {
    const options = args as CommandOptions;
    await storageBenchmark(options, getCloudStorageClient(options));
  },
};

export default benchmarkCloudStorageCommand;
