import { ArgumentsCamelCase, CommandModule } from "yargs";
import getDummyClient from "../storage/DummyClient.js";
import storageBenchmark from "../storage/StorageBenchmark.js";
import { applyBenchmarkOptions, BenchmarkOptions } from "./BenchmarkOptions.js";

export interface DummyOptions {
  downloadTime: number;
  uploadTime: number;
  deleteTime: number;
}

type CommandOptions = ArgumentsCamelCase & BenchmarkOptions & DummyOptions;

const benchmarkDummyCommand: CommandModule = {
  command: "benchmark-dummy <file-sizes...>",
  describe: "Run a dummy benchmark",
  builder: yargs =>
    applyBenchmarkOptions(yargs)
      .option("download-time", {
        type: "number",
        describe: "Simulated download time",
        default: 1,
      })
      .option("upload-time", {
        type: "number",
        describe: "Simulated upload time",
        default: 1,
      })
      .option("delete-time", {
        type: "number",
        describe: "Simulated delete time",
        default: 0.1,
      }),
  handler: async args => {
    const options = args as CommandOptions;
    await storageBenchmark(options, getDummyClient(options));
  },
};

export default benchmarkDummyCommand;
