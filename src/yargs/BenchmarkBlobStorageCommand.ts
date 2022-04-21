import { ArgumentsCamelCase, CommandModule } from "yargs";
import getBlobStorageClient from "../storage/BlobStorageClient.js";
import storageBenchmark from "../storage/StorageBenchmark.js";
import { applyBenchmarkOptions, BenchmarkOptions } from "./BenchmarkOptions.js";

export interface BlobStorageOptions {
  connectionString: string;
  containerName: string;
}

type CommandOptions = ArgumentsCamelCase & BenchmarkOptions & BlobStorageOptions;

const benchmarkBlobStorageCommand: CommandModule = {
  command: "benchmark-blob-storage <file-sizes...>",
  describe: "Run a benchmark of the Azure Blob Storage service",
  builder: yargs =>
    // prettier-ignore
    applyBenchmarkOptions(yargs)
      .option("connection-string", {
        type: "string",
        describe: "Connection string of an Azure Storage account",
        demandOption: true,
      })
      .option("container-name", {
        type: "string",
        describe: "Test container name",
        default: "test"
      }),
  handler: async args => {
    const options = args as CommandOptions;
    await storageBenchmark(options, getBlobStorageClient(options));
  },
};

export default benchmarkBlobStorageCommand;
