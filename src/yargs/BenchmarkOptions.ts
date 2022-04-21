import { Argv } from "yargs";

export interface BenchmarkOptions {
  fileSizes: number[];
  iterations: number;
  outputFilePath: string;
}

export const applyBenchmarkOptions = (yargs: Argv) =>
  // prettier-ignore
  yargs
    .positional("file-sizes", {
      array: true,
      type: "number",
      describe: "Array of file sizes",
      demandOption: true,
    })
    .option("output-file-path", {
      type: "string",
      describe: "Output file path",
      default: "results.json"
    })
    .option("iterations", {
      type: "number",
      describe: "Number of iterations for each file size",
      default: 5,
    });
